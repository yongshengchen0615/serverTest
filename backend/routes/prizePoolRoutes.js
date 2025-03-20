const express = require("express");
const router = express.Router();
const prizePool = require("../models/prizePoolSchema");


// 取得所有資料
router.get("/", async (req, res) => {
    try {
        const items = await prizePool.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "無法獲取資料", error: error.message });
    }
 });

 // 關鍵字搜尋
router.get("/search", async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const items = await Item.find({
            $or: [
                { id: new RegExp(keyword, "i") },
                { probability: new RegExp(keyword, "i") }
            ]
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "搜尋失敗", error: error.message });
    }
 });
module.exports = router;
