import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import LeaveCard from "../../components/shared/LeaveDetailCard";
import { useTheme } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [pendingLeavesCount, setpendingLeavesCount] = useState(null);
  const [leaveTypeCount, setleaveTypeCount] = useState(null);
  const [plazeruserCount, setplazeruserCount] = useState(null);
  useEffect(() => {
    axios
      .get(`https://leviabackend-production-50e4.up.railway.app/leaverequest/pendingleavescount`)
      .then((response) => {
        console.log(response.data);
        setpendingLeavesCount(response.data);
      });

    axios.get(`https://leviabackend-production-50e4.up.railway.app/plazeruser/usercount`).then((response) => {
      console.log(response.data);
      setplazeruserCount(response.data);
    });
    axios.get(`https://leviabackend-production-50e4.up.railway.app/leavetype/count`).then((response) => {
      console.log(response.data);
      setleaveTypeCount(response.data);
    });
  });
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "row",
          padding: "50px 22px 47px 8px",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection:isSmallScreen?"column" :"row", gap: "20px"  }}>
          <LeaveCard
           sx={{width : "16.5rem"}}
            cardcolor={theme.colors.pendingColor}
            title="PENDING LEAVES:"
            count={pendingLeavesCount}
            pagelink="/hr/alluserpendingleaves"
            cardavatar={<ResetTvIcon />}
          />
          <LeaveCard
           sx={{width : "16.5rem"}}
           cardcolor={theme.colors.secondry}
           title="RESPOND LEAVES:"
            count="5"
            pagelink="/hr/alluserhistory"
            cardavatar={<QuestionAnswerIcon />}
          />
          <LeaveCard
           sx={{width : "16.5rem"}}
           cardcolor={theme.colors.approveColor}
           title="Total Users:"
            count={plazeruserCount}
            pagelink="/hr/users"
            cardavatar={<PeopleIcon />}
          />
          <LeaveCard
            sx={{width : "16.5rem"}}
            cardcolor={theme.colors.rejectColor}
            title="Leave Type:"
            count={leaveTypeCount}
            pagelink="/hr/leavetype"
            cardavatar={<FormatIndentDecreaseIcon />}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: "1",
          mb: isSmallScreen ? 2 : 0,
          justifyContent: "space-around",
        }}
      >
      <Paper
  elevation={4}
  sx={{
    padding: "30px 90px 50px 90px",
    marginBottom: "20px",
    width: '50%',
    backgroundColor: theme.colors.secondry,
    borderRadius: '10px',
    boxShadow: '0 8px 8px rgba(0,0,0,0.2)'
  }}
>
  <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', color: theme.colors.primary }}>
    Welcome to the HR dashboard for our Leave Management System. Here you can oversee and manage employee leave requests efficiently.
  </Typography>
  
  <Typography variant="h6" gutterBottom sx={{ borderBottom: `2px solid ${theme.colors.primary}` }}>
    Key Features:
  </Typography>
  
  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.6' }}>
    <li>View and process pending leave requests</li>
    <li>Monitor leave balances for all employees</li>
    <li>Generate reports on leave trends and patterns</li>
    <li>Manage different leave types and policies</li>
    <li>Overview of total workforce and leave statistics</li>
  </ul>
  
  <Typography variant="body2" sx={{ marginTop: 2, fontStyle: 'italic' }}>
    For any system-related issues or policy questions, please contact the IT department or senior management.
  </Typography>
</Paper>

      </Box>
    </Box>
  );
}
