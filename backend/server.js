require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

// 註冊 API 路由
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/address", require("./routes/userRoutes"));
app.use("/api/prizePool", require("./routes/prizePoolRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/home/index.html"));
});
// 假設你的 index.html 放在 Client/home/index.html
// 那就要註冊 Client 為靜態路徑
app.use(express.static(path.join(__dirname, "../Client")));

// 將 manager 資料夾設為靜態資料夾
app.use(express.static(path.join(__dirname, '../manager')));
// 動態處理多個前端資料夾
const staticPaths = ["home", "prototype"];
staticPaths.forEach((dir) => {
  app.use(`/${dir}`, express.static(path.join(__dirname, `../Client/${dir}`)));

  // 若為 SPA，需將所有子路徑導回 index.html
  app.get(`/${dir}/*`, (req, res) => {
    res.sendFile(path.join(__dirname, `../Client/${dir}/index.html`));
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
