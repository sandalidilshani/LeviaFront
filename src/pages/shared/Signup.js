import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: '',
    userFName: '',
    userLName: '',
    AddressL1: 'krinda',
    AddressL2: 'rathkarwaa',
    AddressL3: 'hapurtal',
    Email: '',
    gender: '',
    skills: '',
    DoB: '',
    phone: '',
    role: '',
    image: '',
    gitlink: '',
  });

  const navigate = useNavigate ();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3009/auth/register', formData);
        console.log('User registered successfully!',response.data);
        navigate('/login')    } catch (error) {if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Server responded with error:', error.response.data);
        // Handle specific error messages or display them to the user
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error during request setup:', error.message);
      }
      // Handle generic error UI or alert the user
    }
      // Handle error UI
    }
  

  return (
    <Container component="main" maxWidth="xs">
      <div >
        <Typography component="h1" variant="h5">
          Register User
        </Typography>
        <form  onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                label="Email Address"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            color="primary"
           
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegistrationForm;
