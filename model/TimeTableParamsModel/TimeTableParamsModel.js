
const mongoose = require("mongoose");

const timeTableParamsSchema = new mongoose.Schema({
  day_start_time: String,
  day_end_time: String,
  daily_pause_start: String,
  daily_pause_end: String,

  semestre1_start: String,
  semestre1_end: String,
  semestre2_start: String,
  semestre2_end: String,
});

module.exports = mongoose.model("TimeTableParams", timeTableParamsSchema);