import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

const API_KEY = "38|8odF0DWJUSYnL6wf1HYTcdAnDuqf8MJAfuZsDL4F4b1c495f";
const API_BASE = "https://plus.statbate.com/api";

app.use(cors());

app.get("/tips/:username", async (req, res) => {
  const username = req.params.username;
  const url = `${API_BASE}/members/chaturbate/${username}/tips?range[0]=2015-01-01%2000:00:00&range[1]=2030-01-01%2000:00:00&page=1&per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Statbate error:", response.status, data);
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Proxy fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
