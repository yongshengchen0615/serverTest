require("dotenv").config(); // 載入 .env 檔案的環境變數

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
app.use(cors()); // 允許跨域請求
app.use(express.json()); // 解析 JSON 格式的請求

// 連接 MongoDB，使用環境變數中的 MONGO_URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/adminDB";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ 已成功連接 MongoDB"))
  .catch(err => console.error("❌ 連接 MongoDB 失敗：", err));

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
