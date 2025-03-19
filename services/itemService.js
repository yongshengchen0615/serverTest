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

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem };
