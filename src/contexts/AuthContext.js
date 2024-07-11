import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeAuth = useCallback((token,userId=null) => {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setToken(token);
      sessionStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      const role = decodedToken.roles[0];
      setUserRole(role === "HRManager" ? "HRManager" : "User");
      const useridtoset=userId||decodedToken.sub
      setUser(useridtoset)
      sessionStorage.setItem("userId", useridtoset);

    } catch (e) {
      console.error(e);
      setError("Failed to decode token.");
      SignOut();
    }
    setLoading(false);
  }, []);

  
  // Context for login with Plazer
  const loginWithPlazer = (token, userId) => {
    try {
      console.log('you are logged in with Plazer');
      setUser(userId);
      console.log(userId,token)
      const decodedToken = jwtDecode(token);
      const role = decodedToken.roles[0];
      console.log(role)
      setUserRole(role === "HRManager" ? "HRManager" : "User");
      initializeAuth(token,userId);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch user details.");
      SignOut();
    }
    setLoading(false);
  };

  // Context for normal login
  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.sub);
    const role = decodedToken.roles[0];
    setUserRole(role === "HRManager" ? "HRManager" : "User");
    initializeAuth(token);
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
    if (token) {
      initializeAuth(token,userId);
    } else {
      setLoading(false);
    }
  }, [initializeAuth]);

  const SignOut = () => {
    setUser(null);
    setUserRole(null);
    setToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");

    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    token,
    userRole,
    loading,
    error,
    login,
    loginWithPlazer,
    SignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
