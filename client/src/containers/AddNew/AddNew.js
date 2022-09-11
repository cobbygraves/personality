import React, { useState } from "react";
import "./AddNew.css";
import AdminForm from "../../components/AdminForm/AdminForm";
import axios from "axios";
import HOSTURL from "../../config";

const AddNew = () => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");

  const submissionHandler = (event) => {
    event.preventDefault();

    const optA = { id: "a1", ans: optionA, selected: false };
    const optB = { id: "b2", ans: optionB, selected: false };
    const optC = { id: "c3", ans: optionC, selected: false };
    const optD = { id: "d4", ans: optionD, selected: false };
    const questionData = {
      question: question,
      answers: [optA, optB, optC, optD],
    };
    const userDetails = localStorage.getItem("userDetails");
    const userDetailsFormatted = JSON.parse(userDetails);
    axios
      .post(`${HOSTURL}/question/create`, questionData, {
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
        window.alert("question added to database");
      })
      .catch((err) => window.alert("unauthorized Please Login"));
  };

  return (
    <AdminForm
      name="ADD QUESTION"
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

export default AddNew;
