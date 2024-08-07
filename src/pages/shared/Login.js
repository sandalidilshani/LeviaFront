import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Box, Card, CardMedia, IconButton, Typography, Alert, FilledInput, InputLabel, InputAdornment, FormControl, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import logo from "./../../images/logo.png";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const { loginWithPlazer } = useAuth()
  const theme = useTheme();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handlePlazerLogin = async () => {
    try {

      const UrlParam = new URLSearchParams(window.location.search);
      const token=UrlParam.get('token')
      console.log(token)
      if (!token) {
        setError("Token not found ");
        return;
      }
      const response = await axios.get(`https://leviabackend-production-50e4.up.railway.app/auth/callback?token=${token}`);
      console.log(response.data);
      const user = response.data;
      const decodedToken = jwtDecode(token);

      const userRole = decodedToken.roles[0];
      console.log(userRole)
      loginWithPlazer(token, user);

      if (userRole === 'HRManager') {
        navigate("/hr/home/");
      } else {
        navigate("/user/home/");
      }

    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(err => err.message).join(", ");
          setError(errorMessages);
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://leviabackend-production-50e4.up.railway.app/auth/login", {
        userName,
        userpassword,
      });
      console.log(response.data);
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.roles[0];
      login(token);

      if (userRole === 'HRManager') {
        navigate("/hr/home/");
      } else {
        navigate("/user/home/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(err => err.message).join(", ");
          setError(errorMessages);
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.palette.background.default }}>
      <Card sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        width: { xs: "90%", sm: "80%", md: "60%" },
        height: { xs: "auto", md: "80vh" },
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        },
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: { xs: "white", md: "inherit" }, padding: 4 }}>
          <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button
              variant="outlined"
              sx={{
                m: 1,
                width: "80%",
                padding: 3,
                border: '2px solid black',
                color: 'black',
                marginBottom: 2,
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
              onClick={handlePlazerLogin}
            >
              Login With Plazer
            </Button>
            <Typography variant="h6" color="text.secondary" component="div" sx={{ marginBottom: 5 }}>
              Or
            </Typography>

            <TextField
              id="uname"
              label="User Name"
              variant="filled"
              sx={{
                m: 1,
                width: "80%",
                '& .MuiFilledInput-root': {
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              error={!!error}
            />

            <FormControl sx={{ m: 1, width: "80%", marginBottom: 3 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={userpassword}
                onChange={(e) => setUserPassword(e.target.value)}
                error={!!error}
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              variant="outlined"
              sx={{
                m: 1,
                width: "80%",
                padding: 2,
                border: '2px solid black',
                color: 'black',
                marginBottom: 2,
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
              type="submit"
            >
              Login
            </Button>
          </form>

          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{
                cursor: 'pointer',
                marginBottom: 2,
                transition: '0.3s',
                '&:hover': {
                  color: theme.palette.primary.dark,
                  textDecoration: 'underline',
                },
              }}
            >
              Don't have an account? Sign Up
            </Typography>
          </Link>

          {error && (
            <Alert
              sx={{
                width: "80%",
                m: 1,
                transition: '0.3s',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
              severity="error"
            >
              {error}
            </Alert>
          )}
        </Box>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "40%" },
          backgroundColor: "black",
          transition: '0.3s',
          '&:hover': {
            opacity: 0.9,
          },
        }}>
          <CardMedia component="img" sx={{ width: "100%", height: "100%", objectFit: "contain" }} image={logo} alt="Logo" />
        </Box>
      </Card>
    </Box>
  );
}
