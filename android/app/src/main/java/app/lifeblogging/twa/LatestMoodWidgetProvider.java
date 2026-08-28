package app.lifeblogging.twa;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.widget.RemoteViews;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class LatestMoodWidgetProvider extends AppWidgetProvider {

    // YOUR CLOUD FUNCTION URL
    private static final String API_URL = "https://us-central1-sammy-7298f.cloudfunctions.net/getLatestMood";

    // [CRITICAL FIX] Lock to prevent rapid-fire clicks from crashing the DNS resolver
    private static volatile boolean isUpdating = false;
    private static volatile long lastUpdateMillis = 0; // Cooldown tracker

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // 1. Prevent concurrent updates
        if (isUpdating) return;

        // 2. [CRITICAL FIX] 10-second cooldown to prevent Android OS network shadow-banning
        long now = System.currentTimeMillis();
        if (now - lastUpdateMillis < 10000) {
            android.util.Log.w("MoodWidget", "Refresh ignored: 10-second cooldown active.");
            return;
        }

        isUpdating = true;

        final PendingResult pendingResult = goAsync();
        java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newSingleThreadExecutor();

        executor.execute(() -> {
            try {
                // 1. Instantly set ALL widgets to "Updating..."
                for (int appWidgetId : appWidgetIds) {
                    RemoteViews loadingViews = new RemoteViews(context.getPackageName(), R.layout.latest_mood_widget);
                    loadingViews.setTextViewText(R.id.widget_mood_text, "Updating...");
                    appWidgetManager.updateAppWidget(appWidgetId, loadingViews);
                }

                // 2. Fetch the data EXACTLY ONCE
                WidgetData data = fetchMoodDataFromServer(context);

                // 3. Loop through and update ALL widgets
                for (int appWidgetId : appWidgetIds) {
                    RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.latest_mood_widget);

                    Intent intent = new Intent(context, LatestMoodWidgetProvider.class);
                    intent.setAction("MANUAL_REFRESH");
                    // [CRITICAL FIX] Tell Android a human clicked this, forcing the OS to grant temporary foreground network access
                    intent.addFlags(Intent.FLAG_RECEIVER_FOREGROUND);

                    PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                    views.setOnClickPendingIntent(R.id.widget_refresh_button, pendingIntent);

                    if (data.moodVal != null && data.moodVal.matches("[1-5]")) {
                        views.setTextViewText(R.id.widget_mood_text, "Mood Level: " + data.moodVal);
                    } else {
                        views.setTextViewText(R.id.widget_mood_text, data.moodVal != null ? data.moodVal : "Critical Error");
                    }

                    views.setTextViewText(R.id.widget_mood_emoji, data.emoji);
                    views.setTextViewText(R.id.widget_time_logged, data.loggedTime);
                    views.setTextViewText(R.id.widget_last_updated, data.lastRefreshedTime);
                    views.setInt(R.id.widget_root_layout, "setBackgroundColor", data.colorCode);

                    // Push the final view to the home screen
                    appWidgetManager.updateAppWidget(appWidgetId, views);
                }

                // Update the cooldown timer after a successful attempt
                lastUpdateMillis = System.currentTimeMillis();
            } finally {
                // Release the lock so the user can click refresh again later
                isUpdating = false;
                pendingResult.finish();
                executor.shutdown();
            }
        });
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        // Intercept our custom refresh button click
        if ("MANUAL_REFRESH".equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisAppWidget = new ComponentName(context.getPackageName(), LatestMoodWidgetProvider.class.getName());
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisAppWidget);

            // Safely trigger the protected onUpdate block above
            onUpdate(context, appWidgetManager, appWidgetIds);
        }
    }

    // [DEBUG] Helper class to cleanly hold the fetched API data
    private static class WidgetData {
        String moodVal = "Error";
        String loggedTime = "Logged at: --";
        String lastRefreshedTime = "Refreshed: --";
        int colorCode = Color.parseColor("#475569"); // Slate gray fallback
        String emoji = "⚠️";
    }

    private static WidgetData fetchMoodDataFromServer(Context context) {
        WidgetData data = new WidgetData();
        int maxAttempts = 2;

        // [CRITICAL FIX] Implement a retry loop.
        // Waking up a backgrounded app is instant, but waking up the physical network radio takes ~500ms.
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                android.util.Log.d("MoodWidget", "Fetching from API (Attempt " + attempt + "): " + API_URL);

                URL url = new URL(API_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                // Force a fresh connection to prevent dead Firebase sockets
                conn.setRequestProperty("Connection", "close");
                System.setProperty("http.keepAlive", "false");

                // 8-second limit ensures we fail gracefully before Android's 10-second ANR limit
                conn.setConnectTimeout(8000);
                conn.setReadTimeout(8000);

                int responseCode = conn.getResponseCode();
                android.util.Log.d("MoodWidget", "HTTP Response Code: " + responseCode);

                if (responseCode == 200) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    StringBuilder result = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        result.append(line);
                    }
                    reader.close();

                    JSONObject json = new JSONObject(result.toString());
                    data.moodVal = json.optString("attributeValue", "?");
                    String colorHex = json.optString("color", "#a1a1aa");

                    String rawLoggedTime = json.optString("date", "Unknown");
                    String displayTime = rawLoggedTime;

                    if (!"Unknown".equals(rawLoggedTime)) {
                        try {
                            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
                            inputFormat.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
                            SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
                            Date parsedDate = inputFormat.parse(rawLoggedTime);
                            if (parsedDate != null) displayTime = outputFormat.format(parsedDate);
                        } catch (Exception e) {
                            android.util.Log.e("MoodWidget", "Failed to parse date", e);
                        }
                    }

                    data.loggedTime = "Logged at: " + displayTime;

                    // Color scaling logic
                    switch (data.moodVal) {
                        case "1": data.emoji = "😠"; colorHex = "#ffadad"; break;
                        case "2": data.emoji = "☹️"; colorHex = "#ffd6a5"; break;
                        case "3": data.emoji = "😐"; colorHex = "#fdffb6"; break;
                        case "4": data.emoji = "🙂"; colorHex = "#caffbf"; break;
                        case "5": data.emoji = "😁"; colorHex = "#9bf6ff"; break;
                        default: data.emoji = "❓"; colorHex = "#475569"; break;
                    }
                    data.colorCode = Color.parseColor(colorHex);
                } else {
                    data.moodVal = (responseCode == 401 || responseCode == 403) ? "Auth Blocked" : "API Error " + responseCode;
                    data.emoji = "🔒";
                }

                // If we reach this line, the request succeeded! Break out of the retry loop.
                break;

            } catch (java.net.UnknownHostException e) {
                android.util.Log.e("MoodWidget", "DNS failed on attempt " + attempt);
                if (attempt == maxAttempts) {
                    // [CRITICAL FIX] Detect if Android Power Saving mode is blocking background data
                    android.os.PowerManager pm = (android.os.PowerManager) context.getSystemService(Context.POWER_SERVICE);
                    if (pm != null && pm.isPowerSaveMode()) {
                        data.moodVal = "Power Saver Active";
                        data.emoji = "🔋";
                        data.colorCode = Color.parseColor("#F59E0B"); // Amber warning color
                    } else {
                        data.moodVal = "Network Sleeping";
                        data.emoji = "💤";
                    }
                } else {
                    android.util.Log.d("MoodWidget", "Waiting 1.5s for radio to wake up...");
                    try { Thread.sleep(1500); } catch (InterruptedException ie) {} // Pause to let the OS connect to DNS
                }
            } catch (java.net.SocketTimeoutException e) {
                // Server took longer than 8s to wake up, fail gracefully
                android.util.Log.e("MoodWidget", "Server wake-up timeout.");
                data.moodVal = "Waking Server... Tap Again";
                data.emoji = "🥱";
                break; // Do not retry timeouts, it will trigger an ANR crash
            } catch (Exception e) {
                android.util.Log.e("MoodWidget", "Network Crash Details: " + e.toString());
                data.moodVal = "Error";
                break; // Do not retry fatal errors
            }
        }

        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm", Locale.getDefault());
        data.lastRefreshedTime = "Refreshed: " + sdf.format(new Date());

        return data;
    }
}