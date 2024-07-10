import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import UserDetailsCard from "../../components/shared/UserDetailsCard";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import theme from "../../theme";

export default function Leave() {
  const { userId } = useParams();
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [leaveValidPeriod, setLeaveValidPeriod] = useState(dayjs());
  const [userLeaveId, setUserLeaveId] = useState(null);

  useEffect(() => {
    const fetchUserLeaves = async () => {
      try {
        const response = await axios.get(`https://leviabackend-production-50e4.up.railway.app/${userId}`);
        if (response.data) {
          setUserLeaveId(response.data.userLeaveId);
        }
      } catch (error) {
        console.error("Error fetching user leaves:", error);
      }
    };

    if (userId) {
      fetchUserLeaves();
    }
  }, [userId]);

  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      if (userLeaveId) {
        await axios.put(`http://localhost:3009/userleave/updateuserLeaves/${userId}`, {
          totalLeaves,
          leavesValidUntil: dayjs(leaveValidPeriod).format('YYYY-MM-DD'),
        });
        console.log(totalLeaves,leaveValidPeriod);
      } else {
        await axios.post(`http://localhost:3009/userleave/adduserLeaves/${userId}`, {
          totalLeaves,
          leavesValidUntil: dayjs(leaveValidPeriod).format('YYYY-MM-DD'),
        });
        console.log(totalLeaves,leaveValidPeriod);

      }
      alert("User's total leaves updated successfully!");
    } catch (error) {
      console.error("Error updating user's leaves:", error);
      alert("Failed to update user's leaves.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 5, justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ color: theme.colors.primary, fontWeight: 600, mt: 2 }}>
            Add User Total Leaves </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <UserDetailsCard userId={userId} />
        </Box>

        <Card sx={{ flex: 1, p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: theme.colors.primary, fontWeight: 800, mb: 2 }}>
              Update Total Leaves
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Total Leaves"
                    type="number"
                    value={totalLeaves}
                    onChange={(e) => setTotalLeaves(Number(e.target.value))}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>

                      <DatePicker
                        label="Leaves Valid Until"
                        value={leaveValidPeriod}
                        onChange={setLeaveValidPeriod}
                      />
                    </DemoContainer>

                  </LocalizationProvider>

                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Update Total Leaves
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Typography variant="body1" sx={{ color: theme.colors.red, fontWeight: 600, mt: 2 }}>
        You are responsible for adding and updating user's total leaves.
      </Typography>
    </Box>
  );
}
