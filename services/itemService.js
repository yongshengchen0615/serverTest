const Item = require("../models/Item");

// 新增資料
const createItem = async (data) => {
  return await Item.create(data);
};

// 取得所有資料
const getAllItems = async () => {
  return await Item.find();
};

// 取得單筆資料
const getItemById = async (id) => {
  return await Item.findById(id);
};

// 更新資料
const updateItem = async (id, newData) => {
  return await Item.findByIdAndUpdate(id, newData, { new: true });
};

// 刪除資料
const deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};

// 🔹 **新增查詢資料**
const queryItems = async (query) => {
  return await Item.find({
    $or: [
      { name: { $regex: query, $options: "i" } }, // 忽略大小寫
      { description: { $regex: query, $options: "i" } }
    ]
  });
};

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem, queryItems };
