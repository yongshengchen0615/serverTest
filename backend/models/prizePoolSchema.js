const mongoose = require("mongoose");

// 定義 獎項 資料表結構
const prizePoolSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  prize: {type: [String], required: true},
  style: { type: String, required: true },
  titleText: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("PrizePool", prizePoolSchema);