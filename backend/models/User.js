const mongoose = require("mongoose");

// 定義 Item 資料表結構
const AddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Address", AddressSchema);