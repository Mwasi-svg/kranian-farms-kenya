const functions = require("firebase-functions");
const fetch = require("node-fetch");

const systemPrompt = `
You are Kranian, the friendly AI assistant for Kranian Farms (kranianfarms.com). 
You help customers choose the perfect flowers, herbs, fruits, or vegetables for their needs.

Always:
- Speak in a warm, casual tone like a helpful market vendor.
- Offer flower suggestions for events like weddings, birthdays, or sympathy.
- Guide users through availability, pricing, or delivery questions kindly.
- Ask follow-up questions if you're not sure what the customer wants.
- If unsure of an answer, suggest they contact support or visit the website.

Avoid:
- Technical jargon or robotic language.
- Giving health or medical advice.
- Making up info not found on the site.

Be friendly, helpful, and feel like a real team member at Kranian Farms.
`;

exports.chatWithKranian = functions.https.onRequest(async (req, res) => {
  const userMessage = req.body.message;

  const apiKey = functions.config().gemini?.apikey;

  if (!apiKey) {
    return res.status(500).json({ response: "API key not configured." });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Hmm, not sure how to help with that 🌾";

  res.json({ response: text });
});
