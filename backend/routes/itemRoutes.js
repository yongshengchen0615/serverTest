const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// 取得所有資料
router.get("/", async (req, res) => {
   try {
       const items = await Item.find();
       res.json(items);
   } catch (error) {
       res.status(500).json({ message: "無法獲取資料", error: error.message });
   }
});

// 依照 ID 查詢單筆資料
router.get("/:id", async (req, res) => {
   try {
       const item = await Item.findById(req.params.id);
       if (!item) return res.status(404).json({ message: "找不到該資料" });
       res.json(item);
   } catch (error) {
       res.status(500).json({ message: "查詢錯誤", error: error.message });
   }
});

// 關鍵字搜尋（支援 name 和 phone）
router.get("/search", async (req, res) => {
   try {
       const keyword = req.query.keyword;
       const items = await Item.find({
           $or: [
               { name: new RegExp(keyword, "i") },
               { phone: new RegExp(keyword, "i") }
           ]
       });
       res.json(items);
   } catch (error) {
       res.status(500).json({ message: "搜尋失敗", error: error.message });
   }
});

// 新增資料
router.post("/", async (req, res) => {
   try {
       const { name, phone } = req.body;
       const newItem = new Item({ name, phone });
       await newItem.save();
       res.json(newItem);
   } catch (error) {
       res.status(500).json({ message: "新增失敗", error: error.message });
   }
});

// 更新資料
router.put("/:id", async (req, res) => {
   try {
       const { name, phone } = req.body;
       const updatedItem = await Item.findByIdAndUpdate(
           req.params.id,
           { name, phone },
           { new: true, runValidators: true }
       );

       if (!updatedItem) return res.status(404).json({ message: "找不到該資料" });

       res.json(updatedItem);
   } catch (error) {
       res.status(500).json({ message: "更新失敗", error: error.message });
   }
});

// 刪除資料
router.delete("/:id", async (req, res) => {
   try {
       await Item.findByIdAndDelete(req.params.id);
       res.json({ message: "刪除成功" });
   } catch (error) {
       res.status(500).json({ message: "刪除失敗", error: error.message });
   }
});

module.exports = router;
