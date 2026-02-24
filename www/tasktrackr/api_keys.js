// Register your app at: https://developer.ticktick.com/manage
export const TICKTICK_CLIENT_ID = '3ooYQiYjAFq2cRw2b5';

// Dynamically determine base URL (localhost vs production) but ALWAYS point to /tasktrackr/callback
const BASE_URL = window.location.origin; 
export const TICKTICK_REDIRECT_URI = `${BASE_URL}/tasktrackr/callback.html`;