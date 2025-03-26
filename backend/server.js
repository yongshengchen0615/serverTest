// backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// 初始化
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// __dirname 模擬
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 中介層
app.use(cors());
app.use(express.json());

// ✅ MongoDB 初始化
import './config/database.js';

// ✅ API 路由模組註冊
app.use('/api/items', await import('./routes/itemRoutes.js').then(mod => mod.default));
app.use('/api/address', await import('./routes/userRoutes.js').then(mod => mod.default));
app.use('/api/prizePool', await import('./routes/prizePoolRoutes.js').then(mod => mod.default));

// ✅ 靜態頁面路由處理

// 多前端資料夾（支援 /home, /prototype）
const staticPaths = ['home', 'prototype'];
staticPaths.forEach((dir) => {
  const staticDir = path.join(__dirname, `../Client/${dir}`);
  app.use(`/${dir}`, express.static(staticDir));

  // SPA 處理：前端路由跳轉仍回傳 index.html
  app.get(`/${dir}/*`, (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
  });
});

// ✅ manager 資料夾靜態路由
app.use('/manager', express.static(path.join(__dirname, '../manager')));
app.get('/manager/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../manager/index.html'));
});

// ✅ 根路由導向首頁（可選）
app.get('/', (req, res) => {
  res.redirect('/home');
});

// ✅ 啟動伺服器
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
