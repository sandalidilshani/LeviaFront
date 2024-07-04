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
import { useTheme, ThemeProvider } from "@mui/material/styles";
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

export default function Pendingleaves() {
  const theme = useTheme();
  const { user } = useAuth();
  const [leaverequest, setLeaverequest] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const leavesPerPage = 5;
  useEffect(() => {
    axios
      .get(`http://localhost:3009/leaverequest/pendingleaves/${user}`)
      .then((response) => {
        console.log(response.data);
        setLeaverequest(response.data);
      });
  }, [user]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = leaverequest.slice(indexOfFirstLeave, indexOfLastLeave);
;

  return (
    <ThemeProvider theme={theme}>
      
        <div>
          <Box
            sx={{
              flex: 5,
              justifyContent: "space-between",
              p: "10px",
            }}
          >
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
              *Your leave Request for response
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Leave Id </StyledTableCell>
                    <StyledTableCell>Leave Reason </StyledTableCell>
                    <StyledTableCell>Leave Type </StyledTableCell>
                    <StyledTableCell>Leave Type Details </StyledTableCell>
                    <StyledTableCell >leaveStart</StyledTableCell>
                    <StyledTableCell >leaveEnd</StyledTableCell>
                    <StyledTableCell >LeaveRequest Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentLeaves.map((request) => (
                    <StyledTableRow key={request.leaveId}>
                      <TableCell component="th" scope="row">
                        {request.leaveId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {request.leaveReason}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        
                        {request.leaveTypeid.type}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        
                        {request.leaveTypeid.description}
                      </TableCell>
                      <TableCell align="center">{request.leaveStart}</TableCell>
                      <TableCell align="center">{request.leaveEnd}</TableCell>
                      <TableCell align="center">
                        {request.requestDate}
                      </TableCell>
                      
                      
                    </StyledTableRow>
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
          </Box>
        </div>
      
    </ThemeProvider>
  );
}
