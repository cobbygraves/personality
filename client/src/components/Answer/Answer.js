import React from "react";
import { Typography, Paper } from "@mui/material";
import "./Answer.css";

const Answer = (props) => {
  return (
    <div className="answer" onClick={props.selectedAnswer}>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          alignItems: "center",
          margin: 2,
          height: 57,
        }}
      >
        <Typography
          className="option"
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 15px",
            marginRight: 5,
            height: "100%",
          }}
        >
          {props.option}
        </Typography>
        <Typography variant="h5">{props.answer}</Typography>
      </Paper>
    </div>
  );
};

export default Answer;
