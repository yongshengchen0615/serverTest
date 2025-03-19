const Item = require("../models/Item");

// 新增資料
const createItem = async (data) => {
  return await Item.create(data);
};

// 取得所有資料
const getAllItems = async () => {
  return await Item.find();
};

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
      { userId: query }, // 🔹 可搜尋 `userId`
      { name:  query }, // 忽略大小寫
      { description: query }
    ]
  });
};

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem, queryItems };
