// models/Content.js
const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  body: String,
  questions: [
    {
      text: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
});

module.exports = mongoose.model("Content", contentSchema, "content");
