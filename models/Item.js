const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // 🔹 確保 userId 存入
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
