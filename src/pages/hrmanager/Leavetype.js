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
  Button,
  Typography,
  Pagination,
  TextField,
  Grid,
} from "@mui/material";
import { useTheme, ThemeProvider } from "@mui/material/styles";
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

export default function History() {
  const theme = useTheme();
  const [LeaveTypes, setLeaveTypes] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const typesPerPage = 5;
  const [newLeaveType, setNewLeaveType] = React.useState("");
  const [newLeaveTypeDescription, setNewLeaveTypeDescription] = React.useState("");

  useEffect(() => {
    const getAllLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:3009/leavetype/alltypes");
        setLeaveTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllLeaves();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastLeave = currentPage * typesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - typesPerPage;
  const currentLeaves = LeaveTypes.slice(indexOfFirstLeave, indexOfLastLeave);

  const AddNewLeaveType=async ()=>{
    try{
      await axios.post("http://localhost:3009/leavetype/addtype",{
        type:newLeaveType,
        description:newLeaveTypeDescription
      })
      setNewLeaveType(""); // Clear input fields after successful addition
      setNewLeaveTypeDescription("");
    }
      catch(error){
        console.log(error);
      }
    }
  

  return (
    <ThemeProvider theme={theme}>
      <>
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              p: "10px",
            }}
          >
            <Box
              sx={{
                flex: 2,
                p: "10px",
                flexDirection:'column'
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Leave Type ID</StyledTableCell>
                      <StyledTableCell>Leave Type</StyledTableCell>
                      <StyledTableCell>Leave Description</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentLeaves.map((request) => (
                      <StyledTableRow key={request.leaveTypeid}>
                        <TableCell>{request.leaveTypeid}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.description}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(LeaveTypes.length / typesPerPage)}
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
            <Box
              sx={{
                flex: 2,
                p: "10px",
                justifyContent: "space-around",
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
                Add New Leave Type
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Leave Type"
                    variant="outlined"
                    fullWidth
                    value={newLeaveType}
                    onChange={(e) => setNewLeaveType(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Leave Type Description"
                    variant="outlined"
                    fullWidth
                    value={newLeaveTypeDescription}
                    onChange={(e) => setNewLeaveTypeDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={AddNewLeaveType}
                    fullWidth
                  >
                    Add Leave Type
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{display:'flex'}}>
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
                You are responsible for adding leave types
              </Typography>
            </Box>
            </Box>
            
          </Box>
        </div>
      </>
    </ThemeProvider>
  );
}
