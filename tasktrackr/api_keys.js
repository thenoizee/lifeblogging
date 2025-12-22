// Register your app at: https://developer.ticktick.com/manage
export const TICKTICK_CLIENT_ID = '3ooYQiYjAFq2cRw2b5';
export const TICKTICK_CLIENT_SECRET = 'F5*r#%g++$Ew9o01DzT@r!%8GdsLQqC$';

// Dynamically determine base URL (localhost vs production) but ALWAYS point to /tasktrackr/callback
const BASE_URL = window.location.origin; 
export const TICKTICK_REDIRECT_URI = `${BASE_URL}/tasktrackr/callback.html`;