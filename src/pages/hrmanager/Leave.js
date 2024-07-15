import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DialpadIcon from "@mui/icons-material/Dialpad";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import UserCards from "../../components/shared/UserCards";
import UserDetailsCard from "../../components/shared/UserDetailsCard";

export default function Profile() {
  const [user, setUser] = useState({});
  const [leaveDetails, setLeaveDetails] = useState({});
  const [leaveStatusUpdate, setLeaveStatusUpdate] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const { leaveId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    

    const fetchLeaveDetails = async () => {
      try {
        const response = await axios.get(
          `https://leviabackend-production-50e4.up.railway.app/leaverequest/${leaveId}`
        );
        setLeaveDetails(response.data);
        setUser(response.data.userId.userId);
      } catch (error) {
        console.log("Error fetching leave details:", error);
      }
    };

    fetchLeaveDetails();
  }, [leaveId]);

  const handleUpdateLeaveStatus = async (status) => {
  setConfirmDialogOpen(false);
  setLeaveStatusUpdate(true);
  try {
    console.log(newStatus)
    await axios.put(
      `https://leviabackend-production-50e4.up.railway.app/leaverequest/updateleavestatus/${leaveId}`,
      {
        newStatus: status,
      }
    );
    alert(`Leave request ${status}d successfully!`);
    navigate(-1);
  } catch (error) {
    console.error("Error updating leave status:", error.response || error.message || error);
    alert("Failed to update leave status. Please try again later.");
  } finally {
    setLeaveStatusUpdate(false);
  }
};


  const openConfirmDialog = (status) => {
    setNewStatus(status);
    setConfirmDialogOpen(true);
  };

  if ( !leaveDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <Box sx={{ display: "flex", flexDirection: "row",gap:2 , }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 8 }}>
          <UserDetailsCard userId={user} />
        </Box>

        <Box sx={{ display: "flex", flex: 4, width: "60%" }}>
          <Card sx={{ p: 2, width: "100%", mx: "auto" }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Leave Details
              </Typography>
              <Divider color="#2196F3" sx={{ height: 2, width: "100%" }} />

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <DialpadIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Leave Id:
                  </Typography>
                  <Typography variant="body1">
                    {leaveDetails.leaveId}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <CalendarTodayIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Start Date:
                  </Typography>
                  <Typography variant="body1">
                    {leaveDetails.leaveStart}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    End Date:
                  </Typography>
                  <Typography variant="body1">
                    {leaveDetails.leaveEnd}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <AdfScannerIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Reason:
                  </Typography>
                  <Typography variant="body1">
                    {leaveDetails.leaveReason}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <DescriptionIcon />
                </IconButton>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Leave Type:
                  </Typography>
                  {leaveDetails.leaveTypeid ? (
                    <Box>
                      <Typography variant="body1">
                        Type: {leaveDetails.leaveTypeid.type}
                      </Typography>
                      <Typography variant="body1">
                        Description: {leaveDetails.leaveTypeid.description}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body1">
                      No leave type available
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ mr: 1 }}>
                  <AccessTimeIcon />
                </IconButton>
                <Typography variant="body1" fontWeight="bold">
                  Request Date:
                </Typography>
                <Typography variant="body1">
                  {leaveDetails.requestDate}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    width: "200px",
                    border: "2px solid",
                  }}
                  variant="outlined"
                  onClick={() => openConfirmDialog("approve")}
                  disabled={leaveStatusUpdate}
                >
                  Approve
                </Button>
                <Button
                  sx={{ width: "200px" }}
                  variant="outlined"
                  color="error"
                  onClick={() => openConfirmDialog("reject")}
                  disabled={leaveStatusUpdate}
                >
                  Reject
                </Button>
              </Box>
            </CardContent>

            <Dialog
              open={confirmDialogOpen}
              onClose={() => setConfirmDialogOpen(false)}
            >
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to {newStatus} this leave request?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setConfirmDialogOpen(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdateLeaveStatus(newStatus)}
                  color="primary"
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Box>

        <Box sx={{ display: "flex", pl: 5, flex: 4 }}>
          <UserCards userId={user} />
        </Box>
      </Box>
    </Box>
  );
}
