package app.lifeblogging.twa;

import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private boolean pendingWidgetRoute = false;
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
        Log.d("LoggrWidget", "onResume fired, pendingWidgetRoute: " + pendingWidgetRoute);
        if (pendingWidgetRoute) {
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
        if (pendingWidgetRoute) {
            executeWidgetRoute();
        }
    }

    private void checkIntentForWidget(Intent intent) {
        if (intent != null) {
            if (intent.getData() != null && "loggr://widget/open".equals(intent.getData().toString())) {
                Log.d("LoggrWidget", "Widget URI matched! Setting pending route.");
                pendingWidgetRoute = true;

                // Consume the intent so it doesn't loop
                intent.setData(null);
                intent.setAction(null);
            }
        }
    }

    private void executeWidgetRoute() {
        Runnable routeTask = new Runnable() {
            int attempts = 0;

            @Override
            public void run() {
                attempts++;
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;

                if (webView != null) {
                    Log.d("LoggrWidget", "WebView found. Injecting smart JS route.");
                    pendingWidgetRoute = false;

                    // SMART JS: Only redirect if the user is NOT already on the Loggr page.
                    // If they are already there, do nothing to prevent a hard reload. Firebase will auto-sync.
                    String smartJsRoute = "if (!window.location.pathname.includes('/log/')) { window.location.replace('/log/index.html'); } else { console.log('Already on Loggr, skipping reload'); }";

                    // If cold boot, wait 1s for Capacitor to finish loading. If warm start, execute instantly (50ms).
                    long delayMs = isColdBoot ? 1000 : 50;

                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
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