# Lifeblogging

## About Lifeblogging
Lifeblogging is a comprehensive tracking application designed to help you monitor daily habits, moods, and tasks. Featuring a responsive Progressive Web App (PWA) and a native Android widget, it allows for seamless logging whether you are at your desk or on the go.

---

## Installing as a PWA
To install the Progressive Web App on your device for a native-like experience:
* **iOS (Safari):** Open the app in Safari, tap the **Share** icon, and select **Add to Home Screen**.
* **Android (Chrome):** Open the app in Chrome, tap the **Menu** (three dots), and select **Install app** or **Add to Home screen**.
* **Desktop (Chrome/Edge):** Click the installation icon located on the right side of the URL address bar and confirm the installation.

---

## 📱 Android Home Screen Widget
Lifeblogging includes a native Android widget to keep your latest mood and data right on your home screen.

**Installation Instructions:**
1. **Download the Release:** Navigate to the **Releases** section on the GitHub repository. Locate the latest release, which will be labeled with the current version and a `-dev` tag (for example, `v16.34.0-alpha-dev`). Download the attached `.apk` file from the binary assets box.
2. **Install the App:** Open the downloaded `.apk` file on your Android device to install the application.
3. **Add the Widget:** Long-press any empty space on your Android home screen and select **Widgets**. Scroll down to **Lifeblogging**, tap it, and drag the "Latest Mood" widget onto your screen.

**How it Updates:**
* **Automatic Updates:** Android manages background updates automatically to preserve battery life, typically refreshing every 30-60 minutes according to the widget's background sync interval. You do not need to keep the app open.
* **Manual Refresh:** To fetch your latest data instantly, tap the small refresh icon in the top right corner of the widget.
* **App Version Updates (Important):** Android aggressively caches a widget's layout and click intents the moment it is placed on the home screen. If you install a new APK release that includes changes to the widget's logic or routing, the existing widget will not automatically update. You **must** delete the old widget from your home screen and add a fresh one to ensure all changes take effect.