const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/defaultDB";

// 連接 MongoDB
mongoose.connect(MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;

// 監聽 MongoDB 連線狀態
db.on("connected", () => console.log("✅ MongoDB 連線成功！"));
db.on("error", (err) => console.error("❌ MongoDB 連線失敗：", err));
db.on("disconnected", () => console.log("⚠️ MongoDB 連線中斷"));

module.exports = mongoose;
