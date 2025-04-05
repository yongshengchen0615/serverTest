// models/BookingConfig.js
const mongoose = require("mongoose");

const bookingConfigSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  bufferMinutes: Number,
  maxBookingDays: Number,
  breakPeriods: [
    {
      start: String,
      end: String
    }
  ],
  dateTypes: {
    holiday: [String],
    weeklyOff: [Number],
    blockedDay: [String],
    eventDay: [String],
    halfDay: [String]
  },
  services: {
    main: mongoose.Schema.Types.Mixed,
    addon: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model("BookingConfig", bookingConfigSchema);
