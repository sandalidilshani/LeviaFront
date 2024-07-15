import {
  
  Person,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import AppsIcon from "@mui/icons-material/Apps";
import EditIcon from "@mui/icons-material/Edit";
import { Logout } from "@mui/icons-material";
import theme from "../../theme";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledListItemButton = styled(ListItemButton, {

  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({  height: "15%",
  minWidth: 40,
  color: "white",
  borderRadius: "5px",
  backgroundColor: active ? theme.colors.primary : "transparent",
  "&:hover": {
    backgroundColor: theme.colors.primary,
  },
  gap: theme.spacing(1),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: "white",
  minWidth: "40px",
}));

const SignOutButton = styled(ListItemButton)(({ theme }) => ({
  color: "white",
  borderColor: theme.colors.primary,
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "20px",
  marginTop: 30,
  padding: theme.spacing(1, 2),
  "&:hover": {
    borderColor: "white",
    backgroundColor: "transparent",
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    // Set the active page based on the current URL
    const path = window.location.pathname;
    setActivePage(path);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };
  const { SignOut } = useAuth()
  const handleLogout = () => {
    navigate('/')

    SignOut();
    
  };
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
      bgcolor={"black"}
      color={"white"}
    >
      <Box height="25%">
        <img
          src={logo}
          width="256px"
          height="271px"
          alt="Logo"
          style={{ objectFit: "contain" }}
        />
      </Box>
      <List>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/hr/home"
            onClick={() => handlePageChange("/hr/home")}
            active={activePage === "/hr/home"}
          >
            <StyledListItemIcon>
              <AppsIcon />
            </StyledListItemIcon>
            <ListItemText primary="Homepage" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/hr/alluserpendingleaves"
            onClick={() => handlePageChange("/hr/alluserpendingleaves")}
            active={activePage === "/hr/alluserpendingleaves"}
          >
            <StyledListItemIcon>
              {theme.icons.pendingLeaves}
            </StyledListItemIcon>
            <ListItemText primary="Pending Leaves" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/hr/alluserhistory"
            onClick={() => handlePageChange("/hr/alluserhistory")}
            active={activePage === "/hr/alluserhistory"}
          >
            <StyledListItemIcon>
              {theme.icons.leaveHistory}
            </StyledListItemIcon>
            <ListItemText primary="History" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/hr/newusers"
            onClick={() => handlePageChange("/hr/newusers")}
            active={activePage === "/hr/newusers"}
          >
            <StyledListItemIcon>
              <Person />
            </StyledListItemIcon>
            <ListItemText primary="Add Leaves" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/hr/users"
            onClick={() => handlePageChange("/hr/users")}
            active={activePage === "/hr/users"}
          >
            <StyledListItemIcon>
              <Person />
            </StyledListItemIcon>
            <ListItemText primary="Users" />
          </StyledListItemButton>
        </ListItem>
        
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/hr/leavetype"
            onClick={() => handlePageChange("/hr/leavetype")}
            active={activePage === "/hr/leavetype"}
          >
            <StyledListItemIcon>
              <EditIcon />
            </StyledListItemIcon>
            <ListItemText primary=" Leave types" />
          </StyledListItemButton>
        </ListItem>
        <Divider color="#2196F3" sx={{ height: 2, width: "100%" }} />
        <ListItem>
          <SignOutButton onClick={handleLogout}>
            <StyledListItemIcon>
              <Logout />
            </StyledListItemIcon>
            <ListItemText primary="SignOut" />
          </SignOutButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;