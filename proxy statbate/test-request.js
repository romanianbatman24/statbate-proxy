const fetch = require("node-fetch");

const username = "jasonstaham2003";
const apiKey = "38|8odF0DWJUSYnL6wf1HYTcdAnDuqf8MJAfuZsDL4F4b1c495f";

const url = `https://plus.statbate.com/api/members/chaturbate/${username}/tips?range[0]=2015-01-01%2000:00:00&range[1]=2030-01-01%2000:00:00&page=1&per_page=100`;

fetch(url, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
})
  .then(res => res.json())
  .then(data => {
    console.log("✅ SUCCESS:");
    console.dir(data, { depth: null });
  })
  .catch(err => {
    console.error("❌ FAILED:", err.message);
  });
