import React from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserCard from "../../components/user/UserCard";
import { useAuth } from "../../contexts/AuthContext.js";

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();

  const paperStyle = {
    padding: "30px",
    marginBottom: "20px",
    width: "70%",
    backgroundColor: theme.colors.secondary,
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    
  };

  const titleStyle = {
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: "15px",
    borderBottom: `2px solid ${theme.colors.primary}`,
    paddingBottom: "10px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "space-between  ",
        gap: "30px",
        height:'80%'
      }}
    >
      <Box sx={{ flex: "0 0 300px", marginBottom: isSmallScreen ? "20px" : 0 }}>
        <UserCard userid={user} />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "30px" }}>
        <Paper elevation={4} sx={paperStyle}>
          <Typography variant="h5" sx={titleStyle}>
            Welcome to Levia
          </Typography>
          <Typography variant="body1" paragraph>
            If you are a new user, please wait for HR approval. HR will add your leave counts once your account is set up.
          </Typography>
        </Paper>
        <Paper elevation={4} sx={paperStyle}>
          <Typography variant="h5" sx={titleStyle}>
            Here's what you can do:
          </Typography>
          <ul style={{ paddingLeft: "25px", lineHeight: "1.8" }}>
            <li>View your pending leaves</li>
            <li>Request new leaves</li>
            <li>Check your leave history</li>
            <li>Explore different leave types available</li>
            <li>Check your available and rejected leave count</li>
          </ul>
          <Typography variant="body2" sx={{ marginTop: "20px", fontStyle: "italic", color: theme.colors.primary }}>
            Need help? Contact HR for assistance.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}