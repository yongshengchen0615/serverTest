const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // 🔹 確保 userId 存入
  name: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
