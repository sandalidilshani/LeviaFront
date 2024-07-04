import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/hrmanager/Home";
import AllUsersPendingleaves from "./pages/hrmanager/AllUsersPendingleaves";
import AllusersHistory from "./pages/hrmanager/AllusersHistory";
import Users from "./pages/hrmanager/Users";
import Leave from "./pages/hrmanager/Leave";
import Leavetype from "./pages/hrmanager/Leavetype";
import AddUserLeaves from "./pages/hrmanager/AddUserLeaves";
import UserPendingLeaves from "./pages/hrmanager/UserpendingLeaves";
import Pendingleaves from "./pages/user/UserpendingLeaves";
import UserHome from "./pages/user/Home";
import LeaveRequest from "./pages/user/LeaveRequest";
import UserHistory from "./pages/user/UserHistoryLeaves";
import "./app.css";
import Login from "./pages/shared/Login";
import Signup from "./pages/shared/Signup";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import HRLayout from "./components/hrmanager/Layout";
import UserLayout from "./components/user/Layout";
import UserDetails from "./pages/user/UserDetails";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from './contexts/ProtectedRoute';

function App() {
  
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* HR routes with HRLayout */}
              <Route element={<HRLayout />}>
                <Route element={<ProtectedRoute allowedRoles={['HRManager']} />}>
                  <Route path="/hr/home" element={<Home />} />
                  <Route path="/hr/alluserpendingleaves" element={<AllUsersPendingleaves />} />
                  <Route path="/hr/alluserhistory" element={<AllusersHistory />} />
                  <Route path="/hr/users" element={<Users />} />
                  <Route path="/hr/leavedetails" element={<Leave />} />
                  <Route path="/hr/leavetype" element={<Leavetype />} />
                  <Route path="/hr/leave/:leaveId" element={<Leave />} />
                  <Route path="/hr/adduserleaves/:userId" element={<AddUserLeaves />} />
                  <Route path="/userpendingleaves/:userId" element={<UserPendingLeaves />} />
                </Route>
              </Route>
  
              {/* User routes with UserLayout */}
              <Route element={<UserLayout />}>
                <Route element={<ProtectedRoute allowedRoles={['User']} />}>
                  <Route path="/user/home" element={<UserHome />} />
                  <Route path="/user/leaverequest" element={<LeaveRequest />} />
                  <Route path="/user/userhistory" element={<UserHistory />} />
                  <Route path="/user/pendingleaves/:userId" element={<Pendingleaves />} />
                  <Route path="/user/userdetails" element={<UserDetails />} />
                </Route>
              </Route>
  
              {/* Shared routes */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

export default App;
