import React, { useEffect } from "react";
import axios from "axios";
import Searchbar from "../../components/hrmanager/Searchbar";
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
} from "@mui/material";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

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
  const [leaverequest, setLeaverequest] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const leavesPerPage = 5;

  useEffect(() => {
    axios
      .get(`https://leviabackend-production-50e4.up.railway.app/leaverequest/allpendingleaves`)
      .then((response) => {
        setLeaverequest(response.data);
      });
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = leaverequest.slice(indexOfFirstLeave, indexOfLastLeave);


  return (
    <ThemeProvider theme={theme}>
      
        <div>
          <Searchbar />
          <Box
            sx={{
              flex: 5,
              justifyContent: "space-between",
              p: "10px",
            }}
          >{
            leaverequest.length === 0 ?(
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
              No Pendingleaves
            </Typography>
            ):(

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
                    <StyledTableCell align="center">
                      leaveReason
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      requestDate
                    </StyledTableCell>
                    <StyledTableCell>View More</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentLeaves.map((request) => (
                    <StyledTableRow key={request.leaveId}>
                      <TableCell component="th" scope="row">
                        {request.userId.userFName +
                          " " +
                          request.userId.userLName}
                      </TableCell>
                    
                      <TableCell component="th" scope="row">
                        {request.userId.userId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {request.leaveId}
                      </TableCell>
                      <TableCell align="center">{request.leaveStart}</TableCell>
                      <TableCell align="center">{request.leaveEnd}</TableCell>
                      <TableCell align="center">
                        {request.leaveReason}
                      </TableCell>
                      <TableCell align="center">
                        {request.requestDate}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/hr/leave/${request.leaveId}`}
                          sx={{
                            width: "70%",
                            color: "#2196F3",
                            fontSize: "10px",
                            borderColor: "#2196F30A",
                            border: "2px solid",
                            borderRadius: "10px",
                            "&:hover": {
                              color: "white",
                              backgroundColor: "#2196F3",
                            },
                          }}
                        >
                          View More
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
             )
            }
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
