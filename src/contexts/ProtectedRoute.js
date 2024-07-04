import React from 'react';
import { Navigate ,Outlet} from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole, loading,accessToken} = useAuth();
  console.log(userRole)
  console.log(allowedRoles)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
if (typeof allowedRoles === 'string' && allowedRoles !== userRole) {
    return <Navigate to="/" />;
  }
  console.log('hi')
  return <Outlet/>;
};

export default ProtectedRoute;
