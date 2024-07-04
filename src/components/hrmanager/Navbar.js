import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system"; // Use styled from @mui/system
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  background: "white",
  color: "black",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

export default function Navbar() {
  const [open, setOPen] = useState(false);
  return (
    <AppBar position="sticky" >
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "flex", sm: "block" } }}>
          Home
        </Typography>

        <UserBox>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Typography>hi John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOPen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
