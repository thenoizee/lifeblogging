// /vidtrackr/api_keys.js
export const TRAKT_CLIENT_ID = '46c509e2cef42228978ae6a69b138628a6399c0bf28b729b7883b19ab9b082eb';

// Dynamically determine base URL (localhost vs production) but ALWAYS point to /vidtrackr/callback.html
const BASE_URL = window.location.origin; 
export const TRAKT_REDIRECT_URI = `${BASE_URL}/vidtrackr/callback.html`;