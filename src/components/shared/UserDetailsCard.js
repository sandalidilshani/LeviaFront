import React, { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Avatar, Box, Typography, Chip, Link, Divider, useTheme } from "@mui/material";
import { Email, Phone, Home, GitHub, Code, Cake } from "@mui/icons-material";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";

export default function UserDetailsCard({userId}) {
  console.log(userId)
  const [userDetails, setUserDetails] = useState({});
  const theme = useTheme();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3009/plazeruser/userdetailsbyuserid/${userId}`);
        console.log(res.data);
        setUserDetails(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <Card sx={{ width: "100%", backgroundColor: theme.colors.secondry, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={userDetails.image}
              sx={{
                height: "100px",
                width: "100px",
                border: `3px solid ${theme.colors.primary}`,
              }}
            />
            <Box>
              <Typography variant="h4" fontWeight="bold" color={theme.colors.primary}>
                {userDetails.userFName} {userDetails.userLName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                @{userDetails.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User ID: {userDetails.userId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {userDetails.role}
              </Typography>
              
            </Box>
          </Stack>
          
          <Divider />
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                <Cake fontSize="small" color= {theme.colors.primary} />
                <Typography variant="body2" color="text.secondary">
                  {userDetails.DoB}
                </Typography>
              </Stack>
          <Stack direction="column" spacing={2}>
            {[
              { icon: <Email />, value: userDetails.Email },
              { icon: <Phone />, value: userDetails.phone },
              { icon: <Home />, value: `${userDetails.AddressL1}, ${userDetails.AddressL2}` },
              { icon: <GitHub />, value: userDetails.gitlink, isLink: true },
            ].map((item, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <Box sx={{ color: theme.colors.primary }}>{item.icon}</Box>
                {item.isLink ? (
                  <Link href={item.value} target="_blank" rel="noopener noreferrer" color="inherit">
                    <Typography variant="body1">{item.value}</Typography>
                  </Link>
                ) : (
                  <Typography variant="body1">{item.value}</Typography>
                )}
              </Stack>
            ))}
          </Stack>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Box sx={{ color: theme.colors.primary }}><Code /></Box>
              <Typography variant="h6" color={theme.colors.primary}>Skills</Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {userDetails.skills && userDetails.skills.split(',').map((skill, index) => (
                <Chip 
                  key={index} 
                  label={skill.trim()} 
                  variant="outlined" 
                  size="small" 
                  sx={{ 
                    borderColor: theme.colors.primary, 
                    color: theme.colors.primary,
                    '&:hover': { backgroundColor: theme.colors.primary, color: 'white' }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}