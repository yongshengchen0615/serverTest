const itemService = require("../services/itemService");

// 🔹 新增
const createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ success: false, message: "名稱與描述為必填" });
    }

    const item = await itemService.createItem(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error("❌ 新增資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

// 🔹 取得所有
const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error("❌ 取得資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

// 🔹 取得單筆
const getItemById = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "找不到該筆資料" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error("❌ 取得單筆資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

// 🔹 更新
const updateItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ success: false, message: "名稱與描述為必填" });
    }

    const item = await itemService.updateItem(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ success: false, message: "找不到該筆資料" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error("❌ 更新資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

// 🔹 刪除
const deleteItem = async (req, res) => {
  try {
    const item = await itemService.deleteItem(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "找不到該筆資料" });
    }
    res.status(200).json({ success: true, message: "資料已刪除" });
  } catch (err) {
    console.error("❌ 刪除資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};
const itemService = require("../services/itemService");

// 🔹 新增查詢 API
const queryItems = async (req, res) => {
  try {
    const { q } = req.query; // 取得查詢參數 `q`
    if (!q) {
      return res.status(400).json({ success: false, message: "請提供查詢關鍵字" });
    }

    const items = await itemService.queryItems(q);
    if (items.length === 0) {
      return res.status(404).json({ success: false, message: "查無符合的資料" });
    }

    res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error("❌ 查詢資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

module.exports = { queryItems, createItem, getAllItems, getItemById, updateItem, deleteItem };

