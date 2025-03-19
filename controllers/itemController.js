const itemService = require("../services/itemService");

// 🔹 新增
const createItem = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    if (!userId || !name || !description) {
      return res.status(400).json({ success: false, message: "使用者 ID、名稱與描述為必填" });
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

// 🔹 更新
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
// 🔹 查詢 API
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

// 🔹 確保 `module.exports` 包含 `queryItems`
module.exports = { queryItems, createItem, getAllItems, updateItem, deleteItem };