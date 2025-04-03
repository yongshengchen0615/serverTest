// routes/eventRoutes.js
import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// 取得全部活動
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// 新增活動
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.status(201).json(newEvent);
});

// 修改活動
router.put('/:id', async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 刪除活動
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
