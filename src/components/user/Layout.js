import React from "react";
import { Box, Stack } from "@mui/material";
import Menubar from "./Menubar";
import { Outlet } from "react-router-dom";


export default function Layout({ children }) {
  return (
    <div>
      <Stack direction="row" height={"100vh"}>
        <Menubar />
          <Box p={3} display={"flex"} flexDirection={"column"} flex={10}>

            <Outlet />
        </Box>
      </Stack>
    </div>
  );
}
