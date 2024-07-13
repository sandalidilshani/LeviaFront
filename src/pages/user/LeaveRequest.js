// LeaveRequest.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SnackbarAlert from "../../components/shared/SnakeBarAlert"
import UserCards from "../../components/user/UserCard";
import theme from "../../theme"
import { useAuth } from "../../contexts/AuthContext";

export const LeaveRequest = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [error, setError] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = useAuth();

  console.log("User ID:", user);
  useEffect(() => {
    axios
      .get("https://leviabackend-production-50e4.up.railway.app/leavetype/alltypes")
      .then((res) => {
        setLeaveTypes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching leave types:", error);
      });
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

 

  const handleReasonChange = (event) => {
    setLeaveReason(event.target.value);
  };

  const handleLeaveRequestSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !selectedType || !leaveReason ) {
      setError("Please fill out all required fields.");
      return;
    }
    const requestData = {
      leaveStart: startDate.toISOString().split("T")[0],
      leaveEnd: endDate.toISOString().split("T")[0],
      leaveType: selectedType,
      leaveReason: leaveReason,
      requestDate: new Date().toISOString().split("T")[0],
      userId: parseInt(user),
    };
    try {
      console.log("Leave request submitted:", requestData); // Log the submitted data
      const response = await axios.post(
        `https://leviabackend-production-50e4.up.railway.app/leaverequest/addleave/${user}`,
        requestData
      );
      console.log("Leave request created:", response.data);
      setError(""); // Clear error on success
      setOpenSnackbar(true); // Show the snackbar
    } catch (error) {
      setError("Error creating leave request: " + error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{
      display: "flex",
      flex:1,
      flexDirection: "row",
      alignItems: isSmallScreen ? "center" : "space-between",
    }} >
      <Box sx={{ display:'flex', flexDirection:'row', gap:'5px',flex:2}}>
      <UserCards  />

      </Box>
        <Box
          component="form"
          onSubmit={handleLeaveRequestSubmit}
          sx={{
            display: "flex",
            flex: 4,
            flexDirection: "column",
            gap: "20px",
            px: 7,
            pl:20
          }}
        >
<Typography variant="h4" sx={{ color: theme.colors.primary }}>
      Request Your Leave
    </Typography>    
           
    {error && <Typography color="error">{error}</Typography>}


          <FormControl sx={{ width: "100%" }} variant="outlined">
            <FormLabel htmlFor="leave-dates" required sx={{ color: "black" }}>
              Leave Date Range
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" gap="10px">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  minDate={startDate}
                />
              </Box>
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ width: "70%" }} variant="outlined">
            <FormLabel htmlFor="leaveReason" required sx={{ color: "black" }}>
              Leave Reason
            </FormLabel>
            <TextField
              id="leaveReason"
              type="text"
              value={leaveReason}
              placeholder="Enter your reason with brief details"
              multiline
              rows={3}
              fullWidth
              onChange={handleReasonChange}
            />
          </FormControl>

          <FormControl sx={{ width: "70%" }} variant="outlined">
            <FormLabel htmlFor="leaveType" required sx={{ color: "black" }}>
              Leave Type
            </FormLabel>
            <Select
              id="leaveType"
              value={selectedType}
              onChange={handleTypeChange}
              fullWidth
            >
              {leaveTypes.map((leaveType) => (
                <MenuItem
                  key={leaveType.leaveTypeid}
                  value={leaveType.leaveTypeid}
                >
                  {leaveType.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            onSubmit={handleLeaveRequestSubmit}

            sx={{
              width: "70%",
              backgroundColor:theme.colors.primary,
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: theme.colors.secondary,
              },
            }}
          >
            Submit Leave
          </Button>
        </Box>
      
      <SnackbarAlert open={openSnackbar} onClose={handleCloseSnackbar} userId={user} />
    </Box>
  );
};

export default LeaveRequest;
