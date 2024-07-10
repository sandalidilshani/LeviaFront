import React, { useEffect, useState } from "react";
import {
  Person,
  Logout,
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
import logo from "../../images/logo.png";
import AppsIcon from "@mui/icons-material/Apps";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
const userId=1;
const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  height: "15%",
  minWidth: 40,
  color: "white",
  borderRadius: "5px",
  backgroundColor: active ? theme.colors.primary : "transparent",
  "&:hover": {
    backgroundColor: theme.colors.primary
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
  const [activePage, setActivePage] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    // Set the active page based on the current URL
    const path = window.location.pathname;
    setActivePage(path);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };
  const handleLogout = () => {
    navigate('/')
    Logout();

    
  };
  return (
    <Box
      flex={1}
      height={'100vh'}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
      bgcolor={"black"}
      color={"white"}
    >
      <Box height="30%">
        <img
          src={logo}
          width="256px"
          height="271px"
          style={{ objectFit: "contain" }}
          alt="Logo"  
        />
      </Box>
      <List>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/user/home"  
            to="/user/home" 
            onClick={() => handlePageChange("/user/home")}
            active={activePage === "/user/home"}
          >
            <StyledListItemIcon>
              <AppsIcon />
            </StyledListItemIcon>
            <ListItemText primary="Home" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            to="/user/leaverequest"
            onClick={() => handlePageChange("/user/leaverequest")}
            active={activePage === "/user/leaverequest"}
          >
            <StyledListItemIcon>
              <EditIcon />
            </StyledListItemIcon>
            <ListItemText primary="Request Leave" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href={`/user/pendingleaves/${userId}`}
            onClick={() => handlePageChange(`/user/pendingleaves/${userId}`)}
            active={activePage === `/user/pendingleaves/${userId}`}
          >
            <StyledListItemIcon>
              <BackupTableIcon />
            </StyledListItemIcon>
            <ListItemText primary="Pending Leaves" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/user/userhistory"
            onClick={() => handlePageChange("/user/userhistory")}
            active={activePage === "/user/userhistory"}
          >
            <StyledListItemIcon>
              <MarkChatReadIcon />
            </StyledListItemIcon>
            <ListItemText primary="History" />
          </StyledListItemButton>
        </ListItem>
        <ListItem>
          <StyledListItemButton
            component="a"
            href="/user/userdetails"
            onClick={() => handlePageChange("/user/userdetails")}
            active={activePage === "/user/userdetails"}
          >
            <StyledListItemIcon>
              <Person />
            </StyledListItemIcon>
            <ListItemText primary="My Details" />
          </StyledListItemButton>
        </ListItem>
        <Divider color="#2196F3" sx={{ height: 2, width: "100%" }} />
        <ListItem>
          <SignOutButton   onClick={handleLogout}>
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
