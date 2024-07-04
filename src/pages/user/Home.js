import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/user/Layout";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import LeaveCard from "../../components/shared/leaveCountCard";
import theme from "../../theme"; // assuming theme is in the same directory
import UserCard from "../../components/user/UserCard";

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //decode token for user id
  

  return (
    <Box
      sx={{
        display: "flex",
        flex: "1",
        mb: isSmallScreen ? 2 : 0,
        justifyContent: "space-around",
      }}
    >
      <UserCard />
    </Box>)
}