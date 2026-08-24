package app.lifeblogging.twa;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
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

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if ("MANUAL_REFRESH".equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisAppWidget = new ComponentName(context.getPackageName(), LatestMoodWidgetProvider.class.getName());
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisAppWidget);
            onUpdate(context, appWidgetManager, appWidgetIds);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        // FIXED: Matches 'latest_mood_widget.xml'
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.latest_mood_widget);

        // 1. Setup Refresh Button (FIXED ID: widget_refresh_button)
        Intent intent = new Intent(context, LatestMoodWidgetProvider.class);
        intent.setAction("MANUAL_REFRESH");
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_refresh_button, pendingIntent);

        // 2. Set Loading State (FIXED ID: widget_mood_text)
        views.setTextViewText(R.id.widget_mood_text, "Updating..."); 
        
        // 3. Launch the Background Task safely off the main thread
        fetchMoodData(context, views, appWidgetId, appWidgetManager);
    }

    private static void fetchMoodData(Context context, RemoteViews views, int widgetId, AppWidgetManager manager) {
        // [DEBUG] Executors prevent Android from killing the task prematurely (AsyncTask is deprecated)
        java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newSingleThreadExecutor();
        android.os.Handler handler = new android.os.Handler(android.os.Looper.getMainLooper());

        executor.execute(() -> {
            String moodVal = null;
            String loggedTime = "Logged at: Error";
            String lastRefreshedTime = "Refreshed: Error";
            int colorCode = Color.DKGRAY;
            String emoji = "⚠️";

            try {
                // [DEBUG] Log our attempt to Logcat so we can see what URL it is hitting
                android.util.Log.d("MoodWidget", "Fetching from API: " + API_URL);

                URL url = new URL(API_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000); // [DEBUG] Prevent infinite hanging

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

                    android.util.Log.d("MoodWidget", "Success Payload: " + result.toString());

                    JSONObject json = new JSONObject(result.toString());
                    moodVal = json.optString("attributeValue", "?");
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

                    loggedTime = "Logged at: " + displayTime;

                    // Override API color with a local Red-to-Green scale based on rating
                    switch (moodVal) {
                        case "1":
                            emoji = "😫";
                            colorHex = "#EF4444"; // Red
                            break;
                        case "2":
                            emoji = "😕";
                            colorHex = "#F97316"; // Orange
                            break;
                        case "3":
                            emoji = "😐";
                            colorHex = "#EAB308"; // Amber/Yellow
                            break;
                        case "4":
                            emoji = "🙂";
                            colorHex = "#84CC16"; // Lime/Light Green
                            break;
                        case "5":
                            emoji = "🤩";
                            colorHex = "#22C55E"; // Green
                            break;
                        default:
                            emoji = "❓";
                            colorHex = "#475569"; // Slate/Gray fallback
                            break;
                    }
                    colorCode = Color.parseColor(colorHex);
                } else {
                    // [DEBUG] If the response is not 200 OK, read the Error Stream to see WHY it failed
                    BufferedReader errorReader = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                    StringBuilder errorResult = new StringBuilder();
                    String errorLine;
                    while ((errorLine = errorReader.readLine()) != null) {
                        errorResult.append(errorLine);
                    }
                    errorReader.close();
                    
                    android.util.Log.e("MoodWidget", "Server rejected request. Code: " + responseCode + " Msg: " + errorResult.toString());
                    
                    // [DEBUG] Provide specific feedback to the user on the widget based on HTTP code
                    if (responseCode == 401 || responseCode == 403) {
                        moodVal = "Auth Blocked";
                        emoji = "🔒";
                    } else {
                        moodVal = "API Error " + responseCode;
                    }
                }

                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm", Locale.getDefault());
                lastRefreshedTime = "Refreshed: " + sdf.format(new Date());

            } catch (Exception e) {
                // [DEBUG] Catch local network crashes (missing INTERNET permission, airplane mode, etc.)
                android.util.Log.e("MoodWidget", "Network Crash: ", e);
                moodVal = "Network Error";
            }

            // [DEBUG] Android requires UI updates to execute on the main thread
            final String finalMoodVal = moodVal;
            final String finalLoggedTime = loggedTime;
            final String finalLastRefreshedTime = lastRefreshedTime;
            final int finalColorCode = colorCode;
            final String finalEmoji = emoji;

            handler.post(() -> {
                if (finalMoodVal != null && !finalMoodVal.contains("Error") && !finalMoodVal.contains("Blocked")) {
                    views.setTextViewText(R.id.widget_mood_text, "Mood Level: " + finalMoodVal);
                    views.setTextViewText(R.id.widget_mood_emoji, finalEmoji);
                    views.setTextViewText(R.id.widget_time_logged, finalLoggedTime);
                    views.setTextViewText(R.id.widget_last_updated, finalLastRefreshedTime);
                    views.setInt(R.id.widget_root_layout, "setBackgroundColor", finalColorCode); 
                } else {
                    views.setTextViewText(R.id.widget_mood_text, finalMoodVal != null ? finalMoodVal : "Critical Error");
                    views.setTextViewText(R.id.widget_mood_emoji, finalEmoji);
                    views.setTextViewText(R.id.widget_time_logged, finalLoggedTime);
                    views.setTextViewText(R.id.widget_last_updated, finalLastRefreshedTime);
                }
                manager.updateAppWidget(widgetId, views);
            });
        });
    }
}