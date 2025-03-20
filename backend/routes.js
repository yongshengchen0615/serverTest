const mongoose = require("mongoose"); // 確保 mongoose 被正確引入
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
    const newItem = new Item({ name: req.body.name ,phone:req.body.phone}); // 創建新資料
    await newItem.save(); // 儲存到資料庫
    res.json(newItem);
});

// 更新資料（修改名稱）
router.put("/items/:id", async (req, res) => {
    try {
        const { name, phone } = req.body; // 從請求中取得 name 和 phone
        const id = req.params.id; // 取得 URL 參數中的 ID

        console.log("收到更新請求，ID:", id, "新名稱:", name, "新電話:", phone);
        console.log("請求 body:", req.body);

        // 確保 ID 格式正確
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "無效的 ID 格式" });
        }

        // **防止 name 是物件**
        if (typeof name !== "string" || typeof phone !== "string") {
            console.error("更新失敗：name 或 phone 不是有效字串");
            return res.status(400).json({ message: "請提供有效的 name 和 phone" });
        }

        // 更新資料
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, phone },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "找不到此 ID 的資料" });
        }

        res.json(updatedItem);
    } catch (err) {
        console.error("更新失敗:", err);
        res.status(500).json({ message: "更新失敗", error: err.message });
    }
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
