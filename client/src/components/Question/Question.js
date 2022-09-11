import React, { useEffect, useState } from "react";
import "./Question.css";
import { Paper, Button, Typography } from "@mui/material";
import Answers from "../Answers/Answers";

const Question = (props) => {
  const { question, answers } = props.question;
  const [enableButton, setEnabledButton] = useState(false);

  useEffect(() => {
    for (const ans of answers) {
      if (ans.selected) {
        setEnabledButton(true);
        return;
      }
      setEnabledButton(false);
    }
  }, [answers]);

  return (
    <div className="question">
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: 3 }}>
        Are you an introvert or an extrovert?
      </Typography>
      <Paper
        sx={{
          padding: 3,
          margin: 2,
          background: "rgb(39, 127, 178)",
          color: "white",
        }}
      >
        {question}
      </Paper>
      <Answers answers={answers} />
      <div className="button">
        <Button
          variant="contained"
          style={{ background: enableButton ? "black" : "#ccc" }}
          onClick={props.nextQuestion}
          disabled={!enableButton}
        >
          {props.finish ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Question;
