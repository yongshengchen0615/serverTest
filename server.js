const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// 連接 MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB 連線成功");
  } catch (err) {
    console.error("❌ MongoDB 連線失敗：", err);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API 路由
app.use("/api/items", require("./routes/itemRoutes"));

// **提供靜態檔案，確保 CSS/JS 正確送出**
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath, { extensions: ["html", "css", "js"] }));

// 提供前端靜態檔案
app.use(express.static(path.join(__dirname, "dist")));

// 設定首頁（提供 index.html）
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}/`));
