import React, { useState, useEffect, useCallback } from "react";
import "./EditForm.css";
import AdminForm from "../../components/AdminForm/AdminForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import HOSTURL from "../../config";

const EditForm = () => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [published, setPublished] = useState(null);

  const { id } = useParams();

  const submissionHandler = (event) => {
    event.preventDefault();

    const optA = { id: "a1", ans: optionA, selected: false };
    const optB = { id: "b2", ans: optionB, selected: false };
    const optC = { id: "c3", ans: optionC, selected: false };
    const optD = { id: "d4", ans: optionD, selected: false };
    const questionData = {
      question: question,
      answers: [optA, optB, optC, optD],
      published: published,
      id: id,
    };
    const userDetails = localStorage.getItem("userDetails");
    const userDetailsFormatted = JSON.parse(userDetails);
    axios
      .put(`${HOSTURL}/question/update`, questionData, {
        headers: {
          authorization: `Bearer ${userDetailsFormatted.token}`,
        },
      })
      .then((res) => {
        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        window.alert("question updated");
      })
      .catch((err) => window.alert("unauthorized Please Login"));
  };

  const loadQuestion = useCallback(() => {
    const userDetails = localStorage.getItem("userDetails");
    const userDetailsFormatted = JSON.parse(userDetails);
    try {
      axios
        .get(`${HOSTURL}/question/${id}`, {
          headers: {
            authorization: `Bearer ${userDetailsFormatted.token}`,
          },
        })
        .then((res) => {
          const questionData = res.data;
          setQuestion(questionData.question);
          setOptionA(questionData.answers[0].ans);
          setOptionB(questionData.answers[1].ans);
          setOptionC(questionData.answers[2].ans);
          setOptionD(questionData.answers[3].ans);
          setPublished(questionData.published);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <AdminForm
      name="UPDATE QUESTION"
      handleSubmission={submissionHandler}
      question={question}
      questionHandler={(event) => setQuestion(event.target.value)}
      optionA={optionA}
      optionAHandler={(event) => setOptionA(event.target.value)}
      optionB={optionB}
      optionBHandler={(event) => setOptionB(event.target.value)}
      optionC={optionC}
      optionCHandler={(event) => setOptionC(event.target.value)}
      optionD={optionD}
      optionDHandler={(event) => setOptionD(event.target.value)}
    />
  );
};

export default EditForm;
