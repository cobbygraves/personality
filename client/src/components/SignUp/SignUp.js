import React, { useEffect, useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(false);
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

  const handlePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const signupDetails = {
      email,
      password,
    };

    axios
      .post(`${HOSTURL}/admin/create`, signupDetails)
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
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (password.trim() !== "" && password.trim().length >= 8) {
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

  useEffect(() => {
    if (passwordRepeat.trim() !== "" && passwordRepeat.trim().length >= 8) {
      setIsValidPasswordRepeat(true);
    } else {
      setIsValidPasswordRepeat(false);
    }
  }, [passwordRepeat]);

  let showButton = false;
  if (
    isValidEmail &&
    isValidPassword &&
    isValidPasswordRepeat &&
    password === passwordRepeat
  ) {
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Repeat-Password"
                type="password"
                id="password-repeat"
                autoComplete="password-repeat"
                value={passwordRepeat}
                onChange={handlePasswordRepeat}
              />
              {password !== passwordRepeat && (
                <Typography variant="body1" sx={{ color: "red" }}>
                  password-mismatch / password less than 8 characters
                </Typography>
              )}
              {error && (
                <Typography variant="body1" sx={{ color: "red" }}>
                  email already exist
                </Typography>
              )}
              {loading && (
                <Typography
                  variant="p"
                  sx={{ color: "#ccc", textAlign: "center" }}
                >
                  loading...
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!showButton}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
