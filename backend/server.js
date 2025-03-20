require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
require("./database"); // ✅ 直接載入 `database.js`，確保 MongoDB 連線

const app = express();
app.use(cors());
app.use(express.json());

// 提供前端靜態檔案（讓 Express 直接服務 index.html）
app.use(express.static(path.join(__dirname, "../frontend")));

// 設定 API 路由
app.use("/api", routes);

// 預設首頁導向 index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 伺服器運行於 http://localhost:${PORT}`));
