const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "Required",
  },
  question: {
    type: String,
    required: "Required",
  },
  answers: {
    type: Array,
    required: "Required",
  },
  published: {
    type: Boolean,
  },
});

const QuestionModel = mongoose.model("question", QuestionSchema);

module.exports = QuestionModel;
