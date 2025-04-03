// models/Event.js
import mongoose from 'mongoose';

// ✅ 修改重點：items 改為 [Schema.Types.Mixed]
const sectionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // highlight | card | text
  title: String,
  content: String,
  items: [mongoose.Schema.Types.Mixed] // 可接受 string 或 object 皆可
}, { _id: false });

const buttonSchema = new mongoose.Schema({
  text: String,
  link: String
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
  sections: [sectionSchema],
  buttons: [buttonSchema]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
