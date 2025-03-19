const itemService = require("../services/itemService");

// 🔹 新增
const createItem = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    
    // 🔹 檢查 `userId` 是否正確傳遞
    if (!userId || !name || !description) {
      return res.status(400).json({ success: false, message: "使用者 ID、名稱與描述為必填" });
    }

    const newItem = { userId, name, description }; // 確保 userId 存入資料庫
    const item = await itemService.createItem(newItem);

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error("❌ 新增資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

// 🔹 取得所有資料
const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error("❌ 取得資料失敗:", err);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};

// 🔹 取得單筆資料（修正缺失的 `getItemById`）
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

// 🔹 更新資料
const updateItem = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    if (!userId || !name || !description) {
      return res.status(400).json({ success: false, message: "使用者 ID、名稱與描述為必填" });
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

// 🔹 刪除資料（補上缺失的 `deleteItem`）
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

// 🔹 查詢資料
const queryItems = async (req, res) => {
  try {
    const { q } = req.query;
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

// 🔹 確保 `module.exports` 包含所有函數
module.exports = { queryItems, createItem, getAllItems, getItemById, updateItem, deleteItem };
