// routes/bookingConfigRoutes.js
const express = require("express");
const router = express.Router();
const BookingConfig = require("../models/BookingConfig");

// ✅ GET: 取得最新一筆設定
router.get("/", async (req, res) => {
  try {
    const config = await BookingConfig.findOne().sort({ updatedAt: -1 });
    if (!config) return res.status(404).json({ message: "尚未有設定資料" });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: "取得設定失敗", error: err.message });
  }
});

// ✅ POST: 儲存設定（若有則更新第一筆）
router.post("/", async (req, res) => {
  try {
    let config = await BookingConfig.findOne();
    if (config) {
      Object.assign(config, req.body);
      await config.save();
    } else {
      config = await BookingConfig.create(req.body);
    }
    res.json({ message: "設定已儲存", data: config });
  } catch (err) {
    res.status(500).json({ message: "儲存失敗", error: err.message });
  }
});

module.exports = router;
