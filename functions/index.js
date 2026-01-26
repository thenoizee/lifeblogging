/**
 * Import function triggers from their respective submodules:
 */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { setGlobalOptions } = require("firebase-functions/v2/options");

// Set maximum instances to control costs (optional but recommended)
setGlobalOptions({ maxInstances: 10 });

// Define the secret so the function can access it safely
const tickTickSecret = defineSecret("TICKTICK_CLIENT_SECRET");

exports.exchangeTickTickToken = onRequest(
  { secrets: [tickTickSecret], cors: true }, // cors: true allows your website to call this
  async (req, res) => {
    const { code, redirect_uri } = req.body;

    if (!code) {
      res.status(400).json({ error: "Missing auth code" });
      return;
    }

    try {
      const clientId = "3ooYQiYjAFq2cRw2b5"; // Your public Client ID
      const clientSecret = tickTickSecret.value(); // Securely retrieved from vault
      
      // Create the Basic Auth header securely on the server
      const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

      // Exchange the code for the token
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

      // Send the token back to your frontend
      res.json(data);

    } catch (error) {
      logger.error("TickTick Auth Error", error);
      res.status(500).json({ error: error.message });
    }
  }
);