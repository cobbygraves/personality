import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import HOSTURL from "../../config";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const signupDetails = {
      email,
      password,
    };

    axios
      .post(`${HOSTURL}/admin/login`, signupDetails)
      .then((res) => {
        if (res.data.verification) {
          const userDetails = {
            email: res.data.email,
            token: res.data.token,
          };
          const formattedUserDetails = JSON.stringify(userDetails);
          localStorage.setItem("userDetails", formattedUserDetails);
          setError(false);
          setIsLoading(false);
          ctx.setUserAuth(true);
          navigate("/admin/dashboard");
          return;
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (password.trim() !== "") {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [password]);

  useEffect(() => {
    const isValidMail = validateEmail(email);
    if (isValidMail) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [email]);
  let showButton = false;
  if (isValidEmail && isValidPassword) {
    showButton = true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {error && (
            <Typography variant="body1" sx={{ color: "red" }}>
              wrong email / password
            </Typography>
          )}
          {loading && (
            <Typography variant="p" sx={{ color: "#ccc", textAlign: "center" }}>
              loading...
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!showButton}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button variant="text" onClick={() => navigate("/signup")}>
                Don't have an account? Sign up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
