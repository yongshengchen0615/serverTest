const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.post("/", itemController.createItem);
router.get("/", itemController.getAllItems);
// 🔹 確保 `/search` 放在 `/:id` 之前
router.get("/search", itemController.queryItems);
router.get("/:id", itemController.getItemById);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);
module.exports = router;
