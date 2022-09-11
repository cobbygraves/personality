const {
  readQuestion,
  updateQuestion,
  addQuestion,
  deleteQuestion,
  togglePublish,
  getQuestion,
} = require("../controllers/question");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

const question = express.Router();

question.get("/", readQuestion);
question.delete("/:id", verifyToken, deleteQuestion);
question.post("/create", verifyToken, addQuestion);
question.get("/:id", verifyToken, getQuestion);
question.put("/update", verifyToken, updateQuestion);
question.put("/publish", verifyToken, togglePublish);

module.exports = question;
