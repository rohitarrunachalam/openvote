import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VotingContext } from "../../context/VotingContext";
import React, { useContext, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { logout, reset } from "../../features/auth/authSlice";
export default function Navbar() {
  const { currentAccount, connectWallet } = useContext(VotingContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="space-x-8  font-medium text-center  flex  items-center justify-center  py-6 shadow-md">
      <a href="/dashboard">Dashboard</a>
      <a href="/receipt">Receipt</a>

      <p className="font-light">{currentAccount}</p>
      <button onClick={handleLogout} className="bg-black py-2 px-4  rounded-md text-white ">Logout</button>

      {!currentAccount && (
        <button
          type="button"
          onClick={connectWallet}
          className="flex flex-row justify-center items-center my-5 bg-black p-3 rounded-full cursor-pointer "
        >
          <AiFillPlayCircle className="text-white mr-2" />
          <p className="text-white text-base font-semibold">Connect Wallet</p>
        </button>
      )}
    </div>
  );
}
