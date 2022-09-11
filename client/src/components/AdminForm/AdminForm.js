import React from "react";
import "./AdminForm.css";
import { TextField, Typography, Button } from "@mui/material";

const AdminForm = (props) => {
  let buttonShown = true;

  if (
    props.question.trim() !== "" &&
    props.optionA.trim() !== "" &&
    props.optionB.trim() !== "" &&
    props.optionC.trim() !== "" &&
    props.optionD.trim() !== ""
  ) {
    buttonShown = false;
  }

  return (
    <form className="admin-form" onSubmit={props.handleSubmission}>
      <TextField
        sx={{ width: "100%" }}
        id="filled-multiline-static"
        label="Question"
        multiline
        rows={5}
        variant="filled"
        value={props.question}
        onChange={props.questionHandler}
      />
      <div className="question-option">
        <Typography variant="h4" sx={{ marginRight: 2, marginTop: 1 }}>
          A
        </Typography>
        <TextField
          id="filled-basic"
          variant="filled"
          sx={{ width: "100%" }}
          value={props.optionA}
          onChange={props.optionAHandler}
        />
      </div>
      <div className="question-option">
        <Typography variant="h4" sx={{ marginRight: 2, marginTop: 1 }}>
          B
        </Typography>
        <TextField
          id="filled-basic"
          variant="filled"
          sx={{ width: "100%" }}
          value={props.optionB}
          onChange={props.optionBHandler}
        />
      </div>
      <div className="question-option">
        <Typography variant="h4" sx={{ marginRight: 2, marginTop: 1 }}>
          C
        </Typography>
        <TextField
          id="filled-basic"
          variant="filled"
          sx={{ width: "100%" }}
          value={props.optionC}
          onChange={props.optionCHandler}
        />
      </div>
      <div className="question-option">
        <Typography variant="h4" sx={{ marginRight: 2, marginTop: 1 }}>
          D
        </Typography>
        <TextField
          id="filled-basic"
          variant="filled"
          sx={{ width: "100%" }}
          value={props.optionD}
          onChange={props.optionDHandler}
        />
      </div>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
        type="submit"
        size="large"
        disabled={buttonShown}
      >
        {props.name}
      </Button>
    </form>
  );
};

export default AdminForm;
