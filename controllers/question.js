const QuestionModel = require("../models/questions");
const createError = require("http-errors");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

//logic to add question to the database
const addQuestion = (req, res, next) => {
  const question = {
    id: uuid.v4(),
    published: true,
    ...req.body,
  };
  const questionDocument = new QuestionModel(question);
  questionDocument.save((err) => {
    if (err) {
      return next(createError(400, error));
    }
    res.status(200).json({ message: "successful" });
  });
};

//logic to read all question from database
const readQuestion = (req, res, next) => {
  QuestionModel.find((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.status(404).json({ message: "Question can't be retrieved" });
      next(err);
    }
  });
};

//update question in the database
const updateQuestion = (req, res, next) => {
  const question = req.body;
  const { id } = question;
  QuestionModel.findOneAndUpdate(
    { id: id },
    question,
    {
      new: true,
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        res.status(404).json({ message: "question update failed" });
        next(err);
      }
    }
  );
};

//read a single post from database
const getQuestion = (req, res) => {
  const questionId = req.params.id;
  QuestionModel.findOne({ id: questionId }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  });
};

// method to change post status in the database
const togglePublish = (req, res, next) => {
  const updatedQuestion = req.body;
  const { id } = updatedQuestion;
  QuestionModel.findOneAndUpdate(
    { id: id },
    updatedQuestion,
    {
      new: true,
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        res.status(404).json({ message: `Error with server` });
        next(err);
      }
    }
  );
};

const deleteQuestion = (req, res, next) => {
  QuestionModel.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json(err);
      next(err);
    }
    res.status(200).send("Question Deleted Successfully");
  });
};

module.exports = {
  addQuestion,
  readQuestion,
  updateQuestion,
  deleteQuestion,
  togglePublish,
  getQuestion,
};
