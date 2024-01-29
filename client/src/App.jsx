import Admin from "./pages/Admin";
import User from "./pages/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import AddCandidate from "./components/admin/AddCandidate";
import AddVoter from "./components/admin/AddVoter";
import ElectionState from "./components/admin/ElectionState";
import RealTally from "./components/admin/RealTally";
import Login from "./components/user/Login";
import OTPVerify from "./components/user/OTPVerify";
import AdminLogin from "./components/admin/AdminLogin";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import { loginSuccess, loginFailure } from "./features/auth/admin/adminSlice";
import Receipt from "./components/user/Receipt";
import VoteNow from "./components/user/VoteNow";
import ZTAVerify from "./components/user/ZTAVerify";
import Analytics from "./components/admin/Analytics";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // On app load, check if the admin token exists in local storage and set the state accordingly
    const token = localStorage.getItem("adminToken");
    if (token) {
      // You might want to make an API call here to get admin data using the token and dispatch the appropriate action
      // For simplicity, let's just set the login success state directly for now
      dispatch(loginSuccess({ token }));
    } else {
      dispatch(loginFailure("Login failed."));
    }
  }, [dispatch]);

  return(
  <div className="min-h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<User />} />  
        <Route path="/otp" element={<OTPVerify />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/vote" element={<VoteNow />} />
        <Route path="/verify" element={<ZTAVerify />} />


        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/analytics" element={<Analytics />} />

        
          <Route path="/admin/addCandidate" element={<AddCandidate />} />
          <Route path="/admin/addVoter" element={<AddVoter />} />
          <Route path="/admin/electionState" element={<ElectionState />} />
          <Route path="/admin/realTally" element={<RealTally />} />
        </Route>
        
      <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  </div>);
}

export default App;
