require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

// 註冊 API 路由
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/address", require("./routes/userRoutes"));
app.use("/api/prizePool", require("./routes/prizePoolRoutes"));

// 動態處理多個前端資料夾
const staticPaths = ["home", "5points", "10points", "15points", "20points"];
staticPaths.forEach((dir) => {
  app.use(`/${dir}`, express.static(path.join(__dirname, `../Client/${dir}`)));

  // 若為 SPA，需將所有子路徑導回 index.html
  app.get(`/${dir}/*`, (req, res) => {
    res.sendFile(path.join(__dirname, `../Client/${dir}/index.html`));
  });
});

// 預設首頁
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/home/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
