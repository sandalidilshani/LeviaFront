import React from "react";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import UserPendingLeaves from "../../components/shared/UserPendingLeaves"
import { Box } from "@mui/material";


export default function Pendingleaves() {
  const theme = useTheme();
  const {userId}=useParams();

  return (
    <ThemeProvider theme={theme}>
        <Box p={2} display={"flex"} sx={{justifyItems:'flex-end',justifyContent:'flex-end'}}>
        <UserPendingLeaves userId={userId}/>
        </Box>
    </ThemeProvider>
  );
}
