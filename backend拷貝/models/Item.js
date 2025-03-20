const mongoose = require("mongoose");

// 定義 Item 資料表結構
const ItemSchema = new mongoose.Schema({
   name: { type: String, required: true },
   phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
