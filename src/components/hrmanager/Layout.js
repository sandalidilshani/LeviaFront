import React from "react";
import Navbar from "./Navbar";
import { Box, Stack } from "@mui/material";
import Menubar from "./Menubar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <Stack direction="row" height={"100%"}>
        <Menubar />
        <Box flex={10}>
          
          <Box p={2} display={"flex"} flexDirection={"column"}>
           <Outlet/>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
