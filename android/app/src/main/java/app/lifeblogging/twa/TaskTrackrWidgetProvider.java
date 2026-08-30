package app.lifeblogging.twa;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

public class TaskTrackrWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // [DEBUG] Logging widget update event to trace activity
        android.util.Log.d("TaskTrackrWidget", "onUpdate fired for " + appWidgetIds.length + " TaskTrackr widgets.");

        for (int appWidgetId : appWidgetIds) {
            // Create the RemoteViews object connecting to our 1x1 layout
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.tasktrackr_widget);

            // Create an Intent to launch MainActivity
            Intent launchAppIntent = new Intent(context, MainActivity.class);

            // [DEBUG] Using a specific Data URI to route cleanly to TaskTrackr
            // Added ?action=add to tell the app to immediately open the FAB modal
            launchAppIntent.setData(android.net.Uri.parse("tasktrackr://widget/open?action=add"));
            launchAppIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

            // Wrap the intent in a PendingIntent
            PendingIntent launchPendingIntent = PendingIntent.getActivity(
                    context,
                    3005, // Unique request code
                    launchAppIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            // Attach the click listener to the entire widget root layout
            views.setOnClickPendingIntent(R.id.tasktrackr_widget_root, launchPendingIntent);

            // Push the layout to the home screen
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}