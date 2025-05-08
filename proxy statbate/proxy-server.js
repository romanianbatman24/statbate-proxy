// proxy-server.js

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

const API_KEY = "38|8odF0DWJUSYnL6wf1HYTcdAnDuqf8MJAfuZsDL4F4b1c495f"; // 🛑 Keep this private

app.use(cors());

app.get("/tips/:username", async (req, res) => {
  const { username } = req.params;

  const url = `https://plus.statbate.com/api/members/chaturbate/${username}/tips?range[0]=2015-01-01 00:00:00&range[1]=2030-01-01 00:00:00&page=1&per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Statbate API error" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).json({ error: "Proxy fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Statbate proxy running on http://localhost:${PORT}`);
});
