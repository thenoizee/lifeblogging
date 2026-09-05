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
    private boolean isRoutingInProgress = false; // Guard flag to prevent overlapping executions

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        isColdBoot = true; // App is starting fresh from an OS-killed state
        Log.d("LoggrWidget", "[DEBUG] onCreate fired (Cold Boot / Power Saver)");
        checkIntentForWidget(getIntent());
    }

    @Override
    public void onResume() {
        super.onResume();
        Log.d("LoggrWidget", "[DEBUG] onResume fired. pendingWidgetRoute: " + pendingWidgetRoute);
        // Only trigger if a route is queued and not currently in active loop
        if (pendingWidgetRoute != null && !isRoutingInProgress) {
            executeWidgetRoute();
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        isColdBoot = false; // App was in background memory
        Log.d("LoggrWidget", "[DEBUG] onNewIntent fired (Warm Start)");

        checkIntentForWidget(intent);
        if (pendingWidgetRoute != null && !isRoutingInProgress) {
            executeWidgetRoute();
        }
    }

    private void checkIntentForWidget(Intent intent) {
        if (intent != null && intent.getData() != null) {
            String uriString = intent.getData().toString();
            // [DEBUG] Trace incoming intent URI details
            Log.d("LoggrWidget", "[DEBUG] checkIntentForWidget URI: " + uriString);

            if ("loggr://widget/open".equals(uriString)) {
                Log.d("LoggrWidget", "[DEBUG] Loggr URI matched -> Target: /log/index.html");
                pendingWidgetRoute = "/log/index.html";
            } else if (uriString.startsWith("tasktrackr://widget/open")) {
                if (uriString.contains("action=add")) {
                    Log.d("LoggrWidget", "[DEBUG] TaskTrackr Add Action matched -> Target: /tasktrackr/index.html?action=add");
                    pendingWidgetRoute = "/tasktrackr/index.html?action=add";
                } else {
                    Log.d("LoggrWidget", "[DEBUG] TaskTrackr Open matched -> Target: /tasktrackr/index.html");
                    pendingWidgetRoute = "/tasktrackr/index.html";
                }
            }
            // Retain intent data until execution confirms delivery rather than wiping immediately
        }
    }

    private void executeWidgetRoute() {
        if (pendingWidgetRoute == null) {
            return;
        }

        final String targetRoute = pendingWidgetRoute;
        isRoutingInProgress = true;
        Log.d("LoggrWidget", "[DEBUG] executeWidgetRoute started for target: " + targetRoute);

        Runnable routeTask = new Runnable() {
            int attempts = 0;
            // Increased to allow slower wake-ups under extreme OS power saving
            final int maxAttempts = 80;

            @Override
            public void run() {
                attempts++;
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;

                if (webView != null) {
                    // Check whether WebView has loaded a valid page or is still on blank/uninitialized
                    webView.evaluateJavascript("document.readyState", readyState -> {
                        String currentUrl = webView.getUrl();
                        Log.d("LoggrWidget", "[DEBUG] Attempt " + attempts + " - Document readyState: " + readyState + ", Current URL: " + currentUrl);

                        // If WebView is still on blank or not fully ready during cold boots, re-poll
                        if (readyState == null || "null".equals(readyState) || "\"loading\"".equals(readyState) || currentUrl == null || currentUrl.startsWith("about:")) {
                            if (attempts < maxAttempts) {
                                new Handler(Looper.getMainLooper()).postDelayed(this, 150);
                            } else {
                                Log.e("LoggrWidget", "[DEBUG] Reached max attempts waiting for WebView readyState.");
                                isRoutingInProgress = false;
                            }
                            return;
                        }

                        // Web context is interactive/complete. Safely dispatch navigation
                        Log.d("LoggrWidget", "[DEBUG] Target WebView ready. Injecting router script for: " + targetRoute);
                        pendingWidgetRoute = null; // Clear queue state
                        isRoutingInProgress = false;

                        // Clear Intent payload so subsequent warm-state onResume passes don't re-trigger
                        Intent currentIntent = getIntent();
                        if (currentIntent != null) {
                            currentIntent.setData(null);
                            currentIntent.setAction(null);
                        }

                        String basePath = targetRoute.substring(0, targetRoute.lastIndexOf('/') + 1);
                        String smartJsRoute = "(function() {" +
                                "  console.log('[NativeBridge] Evaluating route to " + targetRoute + "');" +
                                "  var onTarget = window.location.pathname.includes('" + basePath + "');" +
                                "  if (!onTarget) {" +
                                "    window.location.replace('" + targetRoute + "');" +
                                "  } else {" +
                                "    console.log('[NativeBridge] Already on " + basePath + "');" +
                                "    if ('" + targetRoute + "'.indexOf('action=add') !== -1 && typeof window.openQuickAddPopup === 'function') {" +
                                "      window.openQuickAddPopup();" +
                                "    }" +
                                "  }" +
                                "})();";

                        webView.evaluateJavascript(smartJsRoute, value -> {
                            Log.d("LoggrWidget", "[DEBUG] Router script evaluation completed with result: " + value);
                            isColdBoot = false;
                        });
                    });
                } else if (attempts < maxAttempts) {
                    // Polling for Bridge/WebView attachment
                    new Handler(Looper.getMainLooper()).postDelayed(this, 150);
                } else {
                    Log.e("LoggrWidget", "[DEBUG] Timed out waiting for Bridge WebView instance.");
                    isRoutingInProgress = false;
                }
            }
        };

        new Handler(Looper.getMainLooper()).postDelayed(routeTask, 50);
    }
}