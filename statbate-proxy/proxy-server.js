// proxy-server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const API_BASE = 'https://plus.statbate.com/api';
const API_KEY = '38|8odF0DWJUSYnL6wf1HYTcdAnDuqf8MJAfuZsDL4F4b1c495f';

app.get('/tips/:username', async (req, res) => {
  const { username } = req.params;
  const url = `${API_BASE}/members/chaturbate/${username}/tips?range[0]=2015-01-01%2000:00:00&range[1]=2099-01-01%2000:00:00&page=1&per_page=1000`;
  
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy fetch failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy running on port ${PORT}`));
