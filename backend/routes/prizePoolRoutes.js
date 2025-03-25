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
        const items = await prizePool.find({
            $or: [
                { id: new RegExp(keyword, "i") },
                { name: new RegExp(keyword, "i") }
            ]
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "搜尋失敗", error: error.message });
    }
 });

 // 更新資料
router.put("/:id", async (req, res) => {
    try {
        const { name, prize } = req.body;
        const updatedItem = await prizePool.findByIdAndUpdate(
            req.params.id,
            { name, prize },
            { new: true, runValidators: true }
        );
 
        if (!updatedItem) return res.status(404).json({ message: "找不到該資料" });
 
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "更新失敗", error: error.message });
    }
 });
module.exports = router;
