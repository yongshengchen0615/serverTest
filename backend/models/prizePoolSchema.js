const mongoose = require("mongoose");

// 定義 獎項 資料表結構
const prizePoolSchema = new mongoose.Schema({
    id: { type: String, required: true },
    probability: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("PrizePool", prizePoolSchema);