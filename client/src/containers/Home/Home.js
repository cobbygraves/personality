import { useState, useEffect } from "react";
import "./Home.css";
import Question from "../../components/Question/Question";
import Result from "../../components/Result/Result";
import { Typography } from "@mui/material";
import useFetchData from "../../customHooks/useDataFetching";
import HOSTURL from "../../config";
import axios from "axios";
import { conclusions } from "../../data";
import AnswerHandlerCtx from "../../context/AnswerHandler";

const Home = () => {
  const [questions, setQuestions] = useFetchData(`${HOSTURL}/question`);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);
  const [option, setOption] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const publishedQuestions = questions.filter(
    (each) => each.published === true
  );

  useEffect(() => {
    let extrovert = 0;
    let introvert = 0;
    if (showResult) {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i] === 1) {
          extrovert += 1;
        } else {
          introvert += 1;
        }
      } // go through the answers counting the extrovert and introvert to determine personality
      if (extrovert > introvert) {
        setResult(conclusions[0]);
      } else if (extrovert < introvert) {
        setResult(conclusions[1]);
      } else {
        setResult(conclusions[2]);
      }
    }
  }, [answers, count, publishedQuestions.length, showResult]);

  const nextHandler = () => {
    if (count < publishedQuestions.length - 1) {
      setCount((prevState) => prevState + 1);
      setAnswers((prevState) => prevState.concat(option));
      return;
    } // increase the count for the next question and add the extrovert or introvert option to answers
    setAnswers((prevState) => prevState.concat(option));
    setShowResult(true);
  };

  const selectAnswerHandler = (id) => {
    const questionsCopy = [...publishedQuestions];
    const currentQuestion = questionsCopy[count]; //get the current question
    const currentAnswers = [...currentQuestion.answers]; // get the current answers

    //mark the choosen answer and also set the answer to an extrovert or introvert ie. 1 or 2
    currentAnswers.forEach((eachAns) => {
      if (eachAns.id === id) {
        const ansIndex = currentAnswers.findIndex((ans) => ans.id === id); // use the index of the answer choosen to know whether to set an extrovert answer or introvert answer
        if (ansIndex > 1) {
          setOption(2); // extrovert answer
        } else {
          setOption(1); // introvert answer
        }
        eachAns.selected = true;
      } else {
        eachAns.selected = false;
      }
    });
    currentQuestion.answers = currentAnswers;
    questionsCopy[count] = currentQuestion;
    setQuestions(questionsCopy);
  };

  const goBackHandler = () => {
    axios
      .get(`${HOSTURL}/question`)
      .then((resp) => {
        setResult(null);
        setQuestions(resp.data);
        setCount(0);
        setOption(0);
        setShowResult(false);
      })
      .catch((error) => console.log(error));
  };

  let questionContent = (
    <Typography variant="h4" sx={{ textAlign: "center" }}>
      loading question...
    </Typography>
  );

  if (publishedQuestions.length === 0) {
    questionContent = (
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        no questions to load...
      </Typography>
    );
  }

  if (publishedQuestions.length > 0) {
    questionContent = (
      <Question
        question={publishedQuestions[count]}
        nextQuestion={nextHandler}
        finish={questions.length - 1 === count}
      />
    );
  }

  if (result) {
    questionContent = <Result result={result} goBack={goBackHandler} />;
  }

  return (
    <AnswerHandlerCtx.Provider value={selectAnswerHandler}>
      <div className="home">{questionContent}</div>
    </AnswerHandlerCtx.Provider>
  );
};

export default Home;
