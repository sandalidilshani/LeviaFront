import React from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserCard from "../../components/user/UserCard";

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //decode token for user id for context


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "row" : "column",
        alignItems: "center",
        gap: '30px',
        justifyContent: "space-around",

      }}
    >

      <UserCard />
      <Box
        sx={{
          display: "flex",
          flex: "1",
          mb: isSmallScreen ? 2 : 0,
          justifyContent: "space-around",
        }}
      >      <Paper
        elevation={4}
        sx={{
          padding: "30px 90px 50px 90px",
          marginBottom: "20px",
          
          width: '80%',
          backgroundColor: theme.colors.secondry,
          borderRadius: '10px',
          boxShadow: '0 8px 8px rgba(0,0,0,0.2)'
        }}
      >
        <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', color: theme.colors.primary }}>
          Welcome to the Levia
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ borderBottom: `2px solid ${theme.colors.primary}` }}>
        Here's what you can do:
        </Typography>

        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.6' }}>
        <li>View your pending leaves</li>
        <li>Request new leaves</li>
        <li>Check your leave history</li>
        <li>Explore different leave types available</li>
        <li>Check your available and reject leave count</li>
        </ul>

        <Typography variant="body2" sx={{ marginTop: 2, fontStyle: 'italic' }}>
        Need help? Contact HR for assistance.
        </Typography>
      </Paper>
      </Box>
      
    </Box>
  )
}