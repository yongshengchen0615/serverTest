const mongoose = require("mongoose");

// 定義 Item 資料表結構
const ItemSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Item", ItemSchema);
