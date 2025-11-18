const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("TikTok Connector Running"));
app.listen(process.env.PORT || 3000);
// Main server file
console.log('TikTok Connector Loaded');
