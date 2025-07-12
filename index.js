// index.js

require("dotenv").config(); // .env ফাইল লোড করে

const express = require("express");
const axios = require("axios");
const app = express();

app.get("/shourov/ai", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) return res.json({ response: "❌ Prompt missing" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const reply = response.data.choices[0].text.trim();
    res.json({ response: reply });
  } catch (err) {
    console.error("❌ GPT API Error:", err.response?.data || err.message);
    res.json({ response: "❌ GPT API Error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ SHOUROV GPT API is running at port ${PORT}`)
);
