import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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