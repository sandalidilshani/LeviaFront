import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Layout from "../../components/hrmanager/Layout";
import SearchBar from "../../components/hrmanager/Searchbar";
import {
  Dialpad as DialpadIcon,
  CalendarToday as CalendarTodayIcon,
  Description as DescriptionIcon,
  Height,
} from "@mui/icons-material";
import UserCards from "../../components/shared/UserCards";

const user = {
  name: "Sandali Dilshani",
  avatar: "/assets/avatar.png",
  jobTitle: "Developer",
  firstName: "Sandali",
  lastName: "Dilshani",
  birthDay: "1990-01-01",
  role: "Admin",
  department: "Accounting",
};

export function Userdetails() {
  return (
    <>
      <SearchBar />
      <Box
        sx={{ display: "flex", flexDirection: "row", pt: 1, height: "100vh" }}
      >
        <Box sx={{ display: "flex", flex: 2, width: "60%" }}>
          <Card sx={{ p: 1, width: "80%", mx: "auto" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={user.avatar} alt={user.name} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="body1">{user.jobTitle}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <DialpadIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    First Name:
                  </Typography>
                  <Typography variant="body1">{user.firstName}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <DialpadIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Last Name:
                  </Typography>
                  <Typography variant="body1">{user.lastName}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <CalendarTodayIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Birth Day:
                  </Typography>
                  <Typography variant="body1">{user.birthDay}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <DescriptionIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Role:
                  </Typography>
                  <Typography variant="body1">{user.role}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <DescriptionIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Department:
                  </Typography>
                  <Typography variant="body1">{user.department}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,

            width: "30%",
          }}
        >
          <UserCards/>
        </Box>
      </Box>
    </>
  );
}
