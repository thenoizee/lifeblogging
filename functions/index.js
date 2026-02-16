const { onRequest, onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { setGlobalOptions } = require("firebase-functions/v2/options");
const admin = require("firebase-admin");
const axios = require("axios");
const crypto = require("crypto");
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin
if (admin.apps.length === 0) {
  admin.initializeApp();
}

setGlobalOptions({ maxInstances: 10 });

// --- SECRETS & KEYS ---
const tickTickSecret = defineSecret("TICKTICK_CLIENT_SECRET");
const podcastIndexKey = defineSecret("PODCASTINDEX_KEY");    // New
const podcastIndexSecret = defineSecret("PODCASTINDEX_SECRET"); // New

// TODO: ENSURE YOUR KEYS ARE HERE
const HUE_CLIENT_ID = "61472d07-caca-4ba3-bead-4ea7a28eb7f9";     
const HUE_CLIENT_SECRET = "a9d0d32b191081be67cf7ba3c0f472d7"; 
const HUE_APP_ID = "lifeblogging"; 

// ==========================================
// 1. TICKTICK FUNCTION
// ==========================================
exports.exchangeTickTickToken = onRequest(
  { secrets: [tickTickSecret], cors: true },
  async (req, res) => {
    const { code, redirect_uri } = req.body;

    if (!code) {
      res.status(400).json({ error: "Missing auth code" });
      return;
    }

    try {
      const clientId = "3ooYQiYjAFq2cRw2b5"; 
      const clientSecret = tickTickSecret.value(); 
      
      const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

      const tokenResponse = await fetch("https://ticktick.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${credentials}`,
        },
        body: new URLSearchParams({
          code: code,
          grant_type: "authorization_code",
          scope: "tasks:read tasks:write",
          redirect_uri: redirect_uri,
        }),
      });

      const data = await tokenResponse.json();

      if (data.error) {
        throw new Error(data.error_description || "TickTick API Error");
      }

      res.json(data);

    } catch (error) {
      logger.error("TickTick Auth Error", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ==========================================
// 2. HUE FUNCTIONS
// ==========================================

// A. LOGIN
exports.hueLogin = onRequest((req, res) => {
  const uid = req.query.uid; 
  // FIX: Changed 'huemanagr' to 'lightmanagr' to match your folder name
  const redirectUri = `https://${process.env.GCLOUD_PROJECT}.web.app/lightmanagr/callback.html`;
  
  if (!uid) {
      res.send("Error: Missing User ID");
      return;
  }

  // Note: HUE_CLIENT_ID and HUE_APP_ID must be defined at the top of your file
  const authUrl = `https://api.meethue.com/oauth2/auth?clientid=${HUE_CLIENT_ID}&appid=${HUE_APP_ID}&deviceid=lifehub_server&state=${uid}&response_type=code`;
  
  res.redirect(authUrl);
});

// B. TOKEN EXCHANGE (FIXED)
exports.hueTokenExchange = onCall(async (request) => {
  const code = request.data.code;
  
  if (!code) {
      throw new Error("Missing auth code");
  }

  try {
    const authHeader = Buffer.from(`${HUE_CLIENT_ID}:${HUE_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post('https://api.meethue.com/oauth2/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code
      },
      headers: {
        Authorization: `Basic ${authHeader}`
      }
    });

    // --- FIX IS HERE: We only destructure tokens, NOT username ---
    const { access_token, refresh_token } = response.data;

    if (!request.auth) throw new Error("User must be logged in.");
    
    // We save the tokens to the database
    await admin.firestore().collection('users').doc(request.auth.uid).collection('services').doc('hue').set({
      accessToken: access_token,
      refreshToken: refresh_token,
      linkedAt: new Date()
    }, { merge: true }); // Use merge just in case

    return { success: true };
    
  } catch (error) {
    // Improved logging to see exact API response if it fails again
    logger.error("Hue Exchange Failed", error.response?.data || error.message);
    throw new Error('Failed to exchange token');
  }
});

// C. PROXY: Controls lights using the saved DB token
exports.hueProxy = onCall(async (request) => {
  if (!request.auth) throw new Error("Must be logged in");

  // 1. Get tokens from DB
  const db = admin.firestore();
  const snapshot = await db.collection('users').doc(request.auth.uid).collection('services').doc('hue').get();
  const data = snapshot.data();
  
  if (!data || !data.accessToken) {
      throw new Error("Hue not linked. Please connect first.");
  }

  const { accessToken, username } = data;
  
  // If we don't have a username yet, we try '0' (the default placeholder)
  const targetUser = username || '0';
  
  // 2. Prepare the command
  const endpoint = request.data.endpoint; // e.g. "lights" or "lights/1/state"
  const method = request.data.method || 'GET';
  const body = request.data.body || null;

  try {
     const url = `https://api.meethue.com/route/api/${targetUser}/${endpoint}`;
     
     const response = await axios({
        method: method,
        url: url,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: body
     });

     return response.data;
     
  } catch (error) {
     logger.error("Hue Proxy Error", error.response?.data || error.message);
     throw new Error("Failed to send command to Hue.");
  }
});

// D. MANUAL SYNC: Saves a username to the DB (Call this from frontend)
exports.saveHueUsername = onCall(async (request) => {
    if (!request.auth) throw new HttpsError('unauthenticated', "Login required");
    const username = request.data.username;
    
    await admin.firestore().collection('users').doc(request.auth.uid).collection('services').doc('hue').set({
        username: username
    }, { merge: true });
    
    return { success: true };
});

// ==========================================
// 3. PODCAST INDEX PROXY
// ==========================================
exports.podcastIndexProxy = onRequest(
  { secrets: [podcastIndexKey, podcastIndexSecret], cors: true },
  async (request, response) => {
    const apiKey = podcastIndexKey.value();
    const apiSecret = podcastIndexSecret.value();

    // --- Prepare for the API call ---
    const apiHeaderTime = Math.floor(Date.now() / 1000);
    const sha1 = require("crypto")
      .createHash("sha1")
      .update(apiKey + apiSecret + apiHeaderTime)
      .digest("hex");

    const headers = {
      "X-Auth-Date": `${apiHeaderTime}`,
      "X-Auth-Key": apiKey,
      "Authorization": sha1,
      "User-Agent": "PodTrackr/1.0 (via Firebase Cloud Function)",
    };

    const podcastIndexApiUrl = "https://api.podcastindex.org/api/1.0";
    const endpoint = request.query.endpoint;

    if (!endpoint) {
      response.status(400).send("API endpoint parameter is missing.");
      return;
    }

    const targetUrl = new URL(`${podcastIndexApiUrl}${endpoint}`);

    // Pass all other query parameters to the target URL
    for (const key in request.query) {
      if (key !== 'endpoint') {
        targetUrl.searchParams.append(key, request.query[key]);
      }
    }

    try {
      const apiResponse = await axios.get(targetUrl.toString(), { headers });
      response.status(200).json(apiResponse.data);
    } catch (error) {
      logger.error("Error fetching from Podcast Index API:", error.response?.data || error.message);
      response.status(500).send("An error occurred while contacting the Podcast Index API.");
    }
  }
);

// ==========================================
// 4. GET LATEST MOOD (Restored & Updated)
// ==========================================
exports.getLatestMood = onRequest({ cors: true }, async (req, res) => {
  // --- Your specific User ID is now included ---
  const userId = "lDL9pl7kjkMlKx8gezxHG2Qbcwl2";

  const db = admin.firestore();

  try {
    const snapshot = await db
      .collection(`users/${userId}/sources/dailies/data`)
      .where("attributeName", "==", "mood")
      .orderBy("date", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      res.status(404).json({ error: "No mood entries found." });
      return;
    }

    const latestMoodData = snapshot.docs[0].data();

    // Send back the mood value and the date it was logged
    const responseData = {
        attributeValue: latestMoodData.attributeValue,
        date: latestMoodData.date
    };

    res.status(200).json(responseData);

  } catch (error) {
    logger.error("Error fetching latest mood:", error);
    res.status(500).json({ error: "An error occurred while fetching the mood data." });
  }
});