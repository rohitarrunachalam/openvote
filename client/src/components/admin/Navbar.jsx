import React from 'react'
import { adminLogout,reset } from '../../features/auth/admin/adminSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
        dispatch(adminLogout());
        dispatch(reset());
        navigate("/adminlogin");
      };


    return (
        <div>
            <div className="space-x-8  font-medium text-center  py-6 shadow-md">
                <a href="/admin">Admin</a>
                <a href="/admin/addCandidate">Add Candidate</a>
                <a href="/admin/addVoter">Add Voter</a>
                <a href="/admin/electionState">Election Control</a>
                <a href="/admin/realTally">Live Tally</a>
                <a href="/admin/analytics">Analytics</a>
                <button
                    onClick={handleLogout}
                    className="text-medium bg-black text-white px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>

            </div>
        </div>
    )
}
