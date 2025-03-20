const express = require("express");
const router = express.Router();
const userAddress = require("../models/User");


// 取得所有資料
router.get("/", async (req, res) => {
    try {
        const items = await userAddress.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "無法獲取資料", error: error.message });
    }
 });


// 新增資料
router.post("/", async (req, res) => {
   try {
       const {name, address } = req.body;
       const newAddress = new User({ name, address });
       await newAddress.save();
       res.json(newAddress);
   } catch (error) {
       res.status(500).json({ message: "新增失敗", error: error.message });
   }
});

module.exports = router;
