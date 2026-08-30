package app.lifeblogging.twa;

import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private String pendingWidgetRoute = null; // Store the exact HTML path target
    private boolean isColdBoot = false; // Tracks if the app was completely closed

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        isColdBoot = true; // App is starting fresh
        Log.d("LoggrWidget", "onCreate fired (Cold Boot)");
        checkIntentForWidget(getIntent());
    }

    @Override
    public void onResume() {
        super.onResume();
        Log.d("LoggrWidget", "onResume fired, pendingWidgetRoute: " + (pendingWidgetRoute != null));
        if (pendingWidgetRoute != null) {
            executeWidgetRoute();
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        isColdBoot = false; // App was already running in the background!
        Log.d("LoggrWidget", "onNewIntent fired (Warm Start)");

        checkIntentForWidget(intent);
        if (pendingWidgetRoute != null) {
            executeWidgetRoute();
        }
    }

    private void checkIntentForWidget(Intent intent) {
        if (intent != null && intent.getData() != null) {
            String uriString = intent.getData().toString();
            // [DEBUG] Log intercepted URI for validation
            Log.d("LoggrWidget", "Intercepted Intent URI: " + uriString);

            if ("loggr://widget/open".equals(uriString)) {
                Log.d("LoggrWidget", "Loggr URI matched! Routing to /log/index.html");
                pendingWidgetRoute = "/log/index.html";

                intent.setData(null);
                intent.setAction(null);
            } else if (uriString.startsWith("tasktrackr://widget/open")) {
                Log.d("LoggrWidget", "TaskTrackr URI matched! Routing to /tasktrackr/index.html");
                if (uriString.contains("action=add")) {
                    pendingWidgetRoute = "/tasktrackr/index.html?action=add";
                } else {
                    pendingWidgetRoute = "/tasktrackr/index.html";
                }

                intent.setData(null);
                intent.setAction(null);
            }
        }
    }

    private void executeWidgetRoute() {
        // Save local copy to avoid nullification during async execution
        final String targetRoute = pendingWidgetRoute;

        Runnable routeTask = new Runnable() {
            int attempts = 0;

            @Override
            public void run() {
                attempts++;
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;

                if (webView != null) {
                    Log.d("LoggrWidget", "WebView found. Injecting JS route for: " + targetRoute);
                    pendingWidgetRoute = null; // Clear queue state

                    // SMART JS: Dynamically check the path to prevent useless hard reloads
                    // Extracts the base path (e.g. "/tasktrackr/") for the location check
                    String basePath = targetRoute.substring(0, targetRoute.lastIndexOf('/') + 1);
                    String smartJsRoute = "if (!window.location.pathname.includes('" + basePath + "')) { " +
                            "window.location.replace('" + targetRoute + "'); " +
                            "} else { " +
                            "  console.log('Already on target page, skipping reload'); " +
                            "  if ('" + targetRoute + "'.includes('action=add') && typeof window.openQuickAddPopup === 'function') { " +
                            "    window.openQuickAddPopup(); " +
                            "  }" +
                            "}";

                    // Delay slightly longer on cold boots for Capacitor initialization
                    long delayMs = isColdBoot ? 1000 : 50;

                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        // [DEBUG] Trigger the redirect
                        webView.evaluateJavascript(smartJsRoute, null);
                        isColdBoot = false; // Reset the flag
                    }, delayMs);

                } else if (attempts < 50) {
                    new Handler(Looper.getMainLooper()).postDelayed(this, 100);
                }
            }
        };

        new Handler(Looper.getMainLooper()).postDelayed(routeTask, 50);
    }
}