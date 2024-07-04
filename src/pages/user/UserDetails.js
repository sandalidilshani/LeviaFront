// UserDetails.jsx or UserDetails.js
import React from 'react';
import UserDetailsCard from '../../components/shared/UserDetailsCard';
import UserCard from '../../components/user/UserCard';
import { Box } from '@mui/material';
import { useAuth } from "../../contexts/AuthContext";

function UserDetails() {
  const { user } = useAuth();

  return (
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center',pl:5,gap:5 }}>
      <Box sx={{display:'flex', flex:'1',height:'80%'}}>
      <UserDetailsCard userId={user}/>

      </Box>
      <Box sx={{display:'flex', flex:'1', flexDirection:'column'}}>
      <UserCard userId={user}/>

      </Box>
    </Box>
  );
}

export default UserDetails;
