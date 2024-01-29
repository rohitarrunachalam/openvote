import React, { useState, useEffect } from "react";
import axios from "axios";
import { login } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OTPVerify() {
  const { user } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (isError) {
    //     console.log(message);
    //     setMsg("Invalid Login Credentials")
    // }

    if (user) {
      navigate("/dashboard");
    }

    // dispatch(reset());
  }, [user]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the login action
      await dispatch(login({ otp }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="text-center w-[30%] mb-4">
        <h1 className="text-[20px] ">OTP Verification</h1>
        <div className="">Kindly Enter the OTP that has been sent to your Mobile Number</div>
      </div>

      <div className="w-[30%]">
        <input
          type="number"
          placeholder="******"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="shadow appearance-none my-4  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button onClick={handleVerify} className="bg-black w-full cursor-pointer text-center text-white px-4 py-2 rounded-md">
        
            Verify
          </button>
       
      </div>
    </div>
  );
}
