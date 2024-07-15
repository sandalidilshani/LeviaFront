import React, { useEffect } from "react";
import axios from "axios";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Pagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserHistoryLeaves() {
  const [approvedLeaves, setApprovedLeaves] = React.useState([]);
  const [rejectedLeaves, setRejectedLeaves] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const leavesPerPage = 5;
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`https://leviabackend-production-50e4.up.railway.app/leaverequest/approveleaves/${user}`)
      .then((response) => {
        console.log(response.data);
        setApprovedLeaves(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching approved leaves:", error);
        setApprovedLeaves([]);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get(`https://leviabackend-production-50e4.up.railway.app/rejectleaves/${user}`)
      .then((response) => {
        console.log(response.data);
        setRejectedLeaves(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching rejected leaves:", error);
        setRejectedLeaves([]);
      });
  }, [user]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentApprovedLeaves = approvedLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
  const currentRejectedLeaves = rejectedLeaves.slice(indexOfFirstLeave, indexOfLastLeave);

  return (
    <Box sx={{ flex: 5, justifyContent: "space-between", p: "10px" }}>
      <Typography
        variant="h6"
        sx={{
          color: "#0288D1",
          fontFamily: "Roboto",
          fontSize: "20px",
          fontWeight: 800,
          lineHeight: "26px",
          letterSpacing: "0.46px",
          p: "10px",
        }}
      >
        *Your Approved Leave Requests
      </Typography>
      {approvedLeaves.length === 0 ? (
        <Typography variant="body1" sx={{ p: "10px" }}>
          No approved leave requests.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Leave Id</StyledTableCell>
                <StyledTableCell>Leave Reason</StyledTableCell>
                <StyledTableCell>Leave Type</StyledTableCell>
                <StyledTableCell>Leave Type Details</StyledTableCell>
                <StyledTableCell>Leave Start</StyledTableCell>
                <StyledTableCell>Leave End</StyledTableCell>
                <StyledTableCell>Leave Request Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentApprovedLeaves.map((request) => (
                <StyledTableRow key={request.leaveId}>
                  <TableCell component="th" scope="row">{request.leaveId}</TableCell>
                  <TableCell>{request.leaveReason}</TableCell>
                  <TableCell>{request.leaveTypeid.type}</TableCell>
                  <TableCell>{request.leaveTypeid.description}</TableCell>
                  <TableCell align="center">{request.leaveStart}</TableCell>
                  <TableCell align="center">{request.leaveEnd}</TableCell>
                  <TableCell align="center">{request.requestDate}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={Math.ceil(approvedLeaves.length / leavesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />

      <Typography
        variant="h6"
        sx={{
          color: "#D32F2F",
          fontFamily: "Roboto",
          fontSize: "20px",
          fontWeight: 800,
          lineHeight: "26px",
          letterSpacing: "0.46px",
          p: "10px",
          marginTop: "30px"
        }}
      >
        *Your Rejected Leave Requests
      </Typography>
      {rejectedLeaves.length === 0 ? (
        <Typography variant="body1" sx={{ p: "10px" }}>
          No rejected leave requests.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Leave Id</StyledTableCell>
                <StyledTableCell>Leave Reason</StyledTableCell>
                <StyledTableCell>Leave Type</StyledTableCell>
                <StyledTableCell>Leave Type Details</StyledTableCell>
                <StyledTableCell>Leave Start</StyledTableCell>
                <StyledTableCell>Leave End</StyledTableCell>
                <StyledTableCell>Leave Request Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRejectedLeaves.map((request) => (
                <StyledTableRow key={request.leaveId}>
                  <TableCell component="th" scope="row">{request.leaveId}</TableCell>
                  <TableCell>{request.leaveReason}</TableCell>
                  <TableCell>{request.leaveTypeid.type}</TableCell>
                  <TableCell>{request.leaveTypeid.description}</TableCell>
                  <TableCell align="center">{request.leaveStart}</TableCell>
                  <TableCell align="center">{request.leaveEnd}</TableCell>
                  <TableCell align="center">{request.requestDate}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={Math.ceil(rejectedLeaves.length / leavesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </Box>
  );
}
