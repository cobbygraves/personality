import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";

const Result = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper elevation={4} sx={{ width: "75%", padding: 2, marginTop: 3 }}>
        <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 2 }}>
          Personality Profile
        </Typography>
        <Typography variant="h5">{props.result}</Typography>
      </Paper>
      <Button variant="outlined" sx={{ marginTop: 2 }} onClick={props.goBack}>
        Back To Questions
      </Button>
    </Box>
  );
};

export default Result;
