import React, { useContext } from "react";
import "./Answers.css";
import Answer from "../Answer/Answer";
import CheckIcon from "@mui/icons-material/Check";
import AnswerHandlerCtx from "../../context/AnswerHandler";

const options = ["A", "B", "C", "D"];

const Answers = (props) => {
  const ansCTX = useContext(AnswerHandlerCtx);

  const content = props.answers.map((eachAns, index) => {
    let selected = options[index];
    if (eachAns.selected) {
      selected = <CheckIcon />;
    }
    return (
      <Answer
        key={eachAns.id}
        option={selected}
        answer={eachAns.ans}
        selectedAnswer={() => ansCTX(eachAns.id)}
      />
    );
  });
  return <div>{content}</div>;
};

export default Answers;
