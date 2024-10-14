const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },

  quizResults: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      totalQuestions: {
        type: Number,
        required: true,
      },
      completed: Boolean,
      answers: Object,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
