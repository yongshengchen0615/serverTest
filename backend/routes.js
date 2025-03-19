const express = require("express");
const router = express.Router();
const Item = require("./models/Item");

// 取得所有資料
router.get("/items", async (req, res) => {
    const items = await Item.find(); // 查詢 MongoDB 所有資料
    res.json(items);
});

// 新增資料
router.post("/items", async (req, res) => {
    const newItem = new Item({ name: req.body.name }); // 創建新資料
    await newItem.save(); // 儲存到資料庫
    res.json(newItem);
});

// 刪除資料
router.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id); // 根據 ID 刪除資料
    res.json({ message: "刪除成功" });
});

// 關鍵字搜尋
router.get("/items/search", async (req, res) => {
    const keyword = req.query.keyword;
    const items = await Item.find({ name: new RegExp(keyword, "i") }); // 搜尋符合關鍵字的資料
    res.json(items);
});

module.exports = router;
