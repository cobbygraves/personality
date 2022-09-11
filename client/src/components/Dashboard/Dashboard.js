import * as React from "react";
import "./Dashboard.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography, Button } from "@mui/material";
import useFetchData from "../../customHooks/useDataFetching";
import HOSTURL from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [questions, setQuestions] = useFetchData(`${HOSTURL}/question`);
  const navigate = useNavigate();

  const userDetails = localStorage.getItem("userDetails");
  const userDetailsFormatted = JSON.parse(userDetails);

  const editHandler = (id) => {
    navigate(`/admin/edit/${id}`, { replace: true });
  };

  const deleteHandler = (questionId) => {
    const questionsCopy = [...questions];
    const filteredQuestions = questionsCopy.filter(
      (eachQuestion) => eachQuestion.id !== questionId
    );
    axios
      .delete(`${HOSTURL}/question/${questionId}`, {
        headers: {
          authorization: `Bearer ${userDetailsFormatted.token}`,
        },
      })
      .then((res) => {
        setQuestions(filteredQuestions);
        window.alert("question deleted");
      })
      .catch((err) => {
        window.alert("internal server error");
      });
  };

  const publishHandler = (id) => {
    const questionsCopy = [...questions];
    const questionIndex = questionsCopy.findIndex(
      (eachQuestion) => eachQuestion.id === id
    );

    questionsCopy[questionIndex].published =
      !questionsCopy[questionIndex].published;
    axios
      .put(`${HOSTURL}/question/publish`, questionsCopy[questionIndex], {
        headers: {
          authorization: `Bearer ${userDetailsFormatted.token}`,
        },
      })
      .then((res) => {
        setQuestions(questionsCopy);
        if (res.data.published) {
          window.alert("question published");
        } else {
          window.alert("question unpublished");
        }
      })
      .catch((err) =>
        window.alert("internal server error....please login and try again")
      );
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#114aa7" }}>
          <TableRow>
            <TableCell>
              <Typography variant="h5" sx={{ color: "white" }}>
                Question
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5" sx={{ color: "white" }}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((eachData) => (
            <TableRow
              key={eachData.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {eachData.question.substring(0, 75) + "..."}
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {eachData.published ? (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => publishHandler(eachData.id)}
                    sx={{ background: "#dff478", cursor: "pointer" }}
                  >
                    unplish
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => publishHandler(eachData.id)}
                    sx={{ background: "#88f388", cursor: "pointer" }}
                  >
                    publish
                  </Button>
                )}
                <DeleteIcon
                  sx={{
                    color: "red",
                    cursor: "pointer",
                    margin: "0px 10px",
                  }}
                  onClick={() => deleteHandler(eachData.id)}
                />
                <EditIcon
                  sx={{
                    color: "primary.main",
                    background: "#ccc",
                    cursor: "pointer",
                    padding: 0.4,
                  }}
                  onClick={() => editHandler(eachData.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
