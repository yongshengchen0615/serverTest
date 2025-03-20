require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/database"); // ✅ 連接 MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// 載入 API 路由
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);
// 載入 API 路由
const addressRoutes = require("./routes/userRoutes");
app.use("/api/address", addressRoutes);
// 載入 API 路由
const prizePoolRoutes = require("./routes/prizePoolRoutes");
app.use("/api/prizePool", prizePoolRoutes);

// 提供前端靜態檔案
app.use(express.static(path.join(__dirname, "../frontend")));

// 預設首頁
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 伺服器運行於 http://localhost:${PORT}`));
