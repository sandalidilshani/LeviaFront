import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CardMedia,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from "./../../images/logo.png";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: '',
    userFName: '',
    userLName: '',
    AddressL1: '',
    AddressL2: '',
    AddressL3: '',
    Email: '',
    gender: '',
    skills: '',
    DoB: '',
    phone: '',
    role: '',
    image: '',
    gitlink: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://leviabackend-production-50e4.up.railway.app/auth/register', formData);
      console.log('User registered successfully!', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.log('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }
    }
  };

  return (
    <Box sx={{ 
      minHeight: "90vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: 4, 
      backgroundColor: "#f5f5f5"
    }}>
      <Paper elevation={3} sx={{ 
        display: "flex", 
        width: "90%", 
        maxWidth: 1200, 
        overflow: "hidden", 
        borderRadius: 2
      }}>
        <Box sx={{ 
          flex: 2, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: 4, 
          overflowY: "auto", 
          maxHeight: "90vh"
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 4 }}>
            Registration
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', height:'90%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  name="userPassword"
                  type="password"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="First Name"
                  name="userFName"
                  value={formData.userFName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Last Name"
                  name="userLName"
                  value={formData.userLName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Address Line 1"
                  name="AddressL1"
                  value={formData.AddressL1}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Address Line 2"
                  name="AddressL2"
                  value={formData.AddressL2}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Address Line 3"
                  name="AddressL3"
                  value={formData.AddressL3}
                  onChange={handleChange}
                />
              </Grid>
              
              
              
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'unspecified'}>Unspecified</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Date of Birth"
                  name="DoB"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.DoB}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value={'Member'}>Member</MenuItem>
                    <MenuItem value={'OrganizationAdmin'}>Organization Admin</MenuItem>
                    <MenuItem value={'HRManager'}>HR Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Git Link"
                  name="gitlink"
                  value={formData.gitlink}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                padding: 2,
                backgroundColor: 'black',
                color: 'white',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              Register
            </Button>
          </form>
          
        </Box>
        <Box sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          backgroundColor: "black",
          
        }}>
          <CardMedia component="img" sx={{ width: "100%", height: "100%", objectFit: "contain" }} image={logo} alt="Logo" />
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;