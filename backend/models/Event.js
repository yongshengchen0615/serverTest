// models/Event.js
import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  type: String,
  title: String,
  content: String,
  items: [{ title: String, desc: String }]
}, { _id: false });

const buttonSchema = new mongoose.Schema({
  text: String,
  link: String
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  theme: String,
  sections: [sectionSchema],
  buttons: [buttonSchema]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
