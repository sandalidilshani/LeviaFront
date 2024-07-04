// SnackbarAlert.js
import React from "react";
import { Snackbar, Alert, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../theme";

const AlertButton = styled(Button)(({ theme }) => ({
  color: "white",
  width: '80%',
  borderColor: "#2196F3",
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "20px",
  opacity:0.5,
  marginTop: 20,
  padding: theme.spacing(1.5, 3),
  "&:hover": {
    borderColor: "white",
    backgroundColor: "transparent",
  },
}));

const SnackbarAlert = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity="success"
        sx={{
          width: "600px",
          height: "350px",
          backgroundColor: "#333",
          color: "white",
          display: "flex",
          alignItems: 'center',
          flexDirection: "column",
          justifyContent: 'center',
          padding: theme.spacing(3),
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.3)"
        }}
      >
        <Box fontSize="1.2rem" fontWeight="bold" mb={2}>
          Your leave request was submitted.
        </Box>
        <Box display="flex" gap="20px" flexDirection="column" width="100%" alignItems="center">
          <AlertButton
            color="inherit"
            size="medium"
            onClick={() => {
              window.location.href = "/user/userpendingleaves";
            }}
          >
            See Pending Leaves
          </AlertButton>
          <AlertButton
            color="inherit"
            size="medium"
            onClick={() => {
              window.location.href = "/user/leaverequest";
            }}
          >
            Add Another Leave
          </AlertButton>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
