const mongoose = require("mongoose");
require("dotenv").config();

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["unread", "read", "done"],
    default: "unread",
  },
});

module.exports = mongoose.model("Task", taskSchema);
