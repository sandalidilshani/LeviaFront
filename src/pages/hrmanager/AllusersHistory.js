import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Searchbar from "../../components/hrmanager/Searchbar";

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

const LeaveRequestRow = ({ request }) => (
  <StyledTableRow key={request.leaveId}>
    <TableCell component="th" scope="row">
      {request.userId.userFName + " " + request.userId.userLName}
    </TableCell>
    <TableCell component="th" scope="row">
      {request.userId.userId}
    </TableCell>
    <TableCell component="th" scope="row">
      {request.leaveId}
    </TableCell>
    <TableCell align="center">{request.leaveStart}</TableCell>
    <TableCell align="center">{request.leaveEnd}</TableCell>
    <TableCell align="center">{request.leaveReason}</TableCell>
    <TableCell align="center">{request.requestDate}</TableCell>
    <TableCell align="center">{request.leavestatus}</TableCell>
    <TableCell align="center">{request.approveDate}</TableCell>
  </StyledTableRow>
);

const History = () => {
  const theme = useTheme();
  const [leaverequest, setLeaverequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const leavesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3009/leaverequest/approveandrejectleaves`);
        setLeaverequest(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = Array.isArray(leaverequest) ? leaverequest.slice(indexOfFirstLeave, indexOfLastLeave) : [];

  return (
      <div>
        <Box sx={{ flex: 5, justifyContent: "space-between", p: "10px" }}>
          
          
            
          
          {currentLeaves.length === 0 ? (
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
              No Approved or Rejected Leave Request Found
            </Typography>
          ) : (
            <>
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
            *Select Leave for More details
          </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User </StyledTableCell>
                      <StyledTableCell>UserId </StyledTableCell>
                      <StyledTableCell>leaveId </StyledTableCell>
                      <StyledTableCell align="center">leaveStart</StyledTableCell>
                      <StyledTableCell align="center">leaveEnd</StyledTableCell>
                      <StyledTableCell align="center">leaveReason</StyledTableCell>
                      <StyledTableCell align="center">requestDate</StyledTableCell>
                      <StyledTableCell>Response Status</StyledTableCell>
                      <StyledTableCell>Response Date</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentLeaves.map((request) => (
                      <LeaveRequestRow key={request.leaveId} request={request} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(leaverequest.length / leavesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              />
            </>
          )}
        </Box>
      </div>
  );
};

export default History;