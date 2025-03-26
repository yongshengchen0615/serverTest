const express = require("express");
const router = express.Router();
const prizePool = require("../models/prizePoolSchema");
// 新增資料
router.post("/", async (req, res) => {
    try {
        const { name, prize, style, titleText } = req.body;
        const newItem = new Item({ name, prize, style, titleText});
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ message: "新增失敗", error: error.message });
    }
 });


// 取得所有資料
router.get("/", async (req, res) => {
    try {
        const items = await prizePool.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "無法獲取資料", error: error.message });
    }
});

// 依照 ID 查詢單筆資料
router.get("/:id", async (req, res) => {
    try {
        const item = await prizePool.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "找不到該資料" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "查詢錯誤", error: error.message });
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
        const { name, prize, style, titleText } = req.body;
        const updatedItem = await prizePool.findByIdAndUpdate(
            req.params.id,
            { name, prize, style, titleText },
            { new: true, runValidators: true }
        );

        if (!updatedItem) return res.status(404).json({ message: "找不到該資料" });

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "更新失敗", error: error.message });
    }
});
module.exports = router;
