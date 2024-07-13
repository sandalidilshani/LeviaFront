import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LeaveCard from "../../components/shared/leaveCountCard";
import { useAuth } from "../../contexts/AuthContext";

export default function UserCard() {
  const theme = useTheme();
  const { user } = useAuth();
  const [pendingLeavesCount, setPendingLeavesCount] = useState(null);
  const [userLeaveCount, setUserLeavesCount] = useState(null);
  const [availableLeaveCount, setAvailableLeaveCount] = useState(null);
  const [validDate, setValidDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user)
      if (!user ) {
        console.error("User ID is not available");
        return;
      }

      try {
        const [pendingLeavesResponse, userLeavesResponse] = await Promise.all([
          axios.get(`https://leviabackend-production-50e4.up.railway.app/leaverequest/userpendingleaves/${user}`),
          axios.get(`hhttps://leviabackend-production-50e4.up.railway.app/userleavecount/${user}`)
        ]);

        setPendingLeavesCount(pendingLeavesResponse.data);
        
        const userLeaveData = userLeavesResponse.data;
        setAvailableLeaveCount(userLeaveData.availableLeaves);
        setValidDate(userLeaveData.leavesValidUntil);
        setUserLeavesCount(userLeaveData.totalLeaves);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      <LeaveCard
        sx={{ width: "260px", height: "150px", margin: "10px" }}
        cardcolor={theme.colors.pendingColor}
        title="AVAILABLE LEAVES:"
        count={availableLeaveCount}
        cardavatar={theme.icons.availableLeaveCount}
      />
      <LeaveCard
        sx={{ width: "260px", height: "150px", margin: "10px" }}
        cardcolor="green"
        title="TOTAL LEAVES:"
        count={userLeaveCount}
        cardavatar={theme.icons.totalLeaveCount}
      />
      <LeaveCard
        sx={{ width: "260px", height: "150px", margin: "10px" }}
        cardcolor="blue"
        title="Leaves valid until"
        count={validDate}
        cardavatar={theme.icons.leaveHistory}
      />
      <LeaveCard
        sx={{ width: "260px", height: "150px", margin: "10px" }}
        cardcolor="orange"
        title="PENDING RESPONSE LEAVES:"
        count={pendingLeavesCount}
        pagelink="/userdetails"
        cardavatar={theme.icons.pendingLeaves}
      />
    </Box>
  );
}