const itemService = require("../services/itemService");

// 新增
const createItem = async (req, res) => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 取得所有
const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 取得單筆
const getItemById = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 更新
const updateItem = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 刪除
const deleteItem = async (req, res) => {
  try {
    const item = await itemService.deleteItem(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem };
