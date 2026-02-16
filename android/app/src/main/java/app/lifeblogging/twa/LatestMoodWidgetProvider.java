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
        
        // 3. Launch the Background Task
        new FetchMoodTask(views, appWidgetId, appWidgetManager).execute();
    }

    private static class FetchMoodTask extends AsyncTask<Void, Void, String> {
        private RemoteViews views;
        private int widgetId;
        private AppWidgetManager manager;
        private int colorCode = Color.DKGRAY;
        private String lastUpdatedTime;

        FetchMoodTask(RemoteViews views, int widgetId, AppWidgetManager manager) {
            this.views = views;
            this.widgetId = widgetId;
            this.manager = manager;
        }

        @Override
        protected String doInBackground(Void... voids) {
            try {
                URL url = new URL(API_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(5000);
                
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }
                reader.close();

                JSONObject json = new JSONObject(result.toString());
                String moodVal = json.optString("attributeValue", "?");
                String colorHex = json.optString("color", "#a1a1aa"); // Default Grey
                
                colorCode = Color.parseColor(colorHex);
                
                // Set formatted time
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm", Locale.getDefault());
                lastUpdatedTime = "Updated: " + sdf.format(new Date());

                return moodVal;

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPostExecute(String moodValue) {
            if (moodValue != null) {
                // Success
                views.setTextViewText(R.id.widget_mood_text, "Mood Level: " + moodValue);
                views.setTextViewText(R.id.widget_mood_emoji, getEmojiForMood(moodValue));
                views.setTextViewText(R.id.widget_last_updated, lastUpdatedTime);
                
                // FIXED ID: widget_root_layout (for background color)
                views.setInt(R.id.widget_root_layout, "setBackgroundColor", colorCode); 
            } else {
                // Error
                views.setTextViewText(R.id.widget_mood_text, "Network Error");
                views.setTextViewText(R.id.widget_mood_emoji, "⚠️");
            }
            manager.updateAppWidget(widgetId, views);
        }

        private String getEmojiForMood(String val) {
            switch (val) {
                case "1": return "😫";
                case "2": return "😕";
                case "3": return "😐";
                case "4": return "🙂";
                case "5": return "🤩";
                default: return "❓";
            }
        }
    }
}