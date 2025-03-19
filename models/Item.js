const mongoose = require("mongoose");

// 🔹 確保變數名稱一致，使用 `ItemSchema`
const ItemSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // 確保 userId 存入
  name: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

// 🔹 確保 `ItemSchema` 被正確使用
module.exports = mongoose.model("Item", ItemSchema);