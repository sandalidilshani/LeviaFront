import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeAuth = useCallback((token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.sub);
      const role = decodedToken.roles[0];
      console.log(role);
      if (role === 'HRManager') {
        setUserRole('HRManager');
      } else {
        setUserRole('User');
      }
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setAccessToken(token);
      sessionStorage.setItem("accessToken", token);
    } catch (e) {
      console.error(e);
      setError("Failed to decode token.");
      logout();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      initializeAuth(token);
    } else {
      setLoading(false);
    }
  }, [initializeAuth]);

  const login = (token) => {
    initializeAuth(token);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setAccessToken(null);
    sessionStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    accessToken,
    userRole,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}