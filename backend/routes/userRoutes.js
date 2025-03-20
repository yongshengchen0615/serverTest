const express = require("express");
const router = express.Router();
const User = require("../models/User");


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
