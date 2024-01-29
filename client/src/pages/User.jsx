import { VotingContext } from "../context/VotingContext";
import React, { useContext, useEffect } from "react";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/user/Navbar";
export default function User() {
  const {
    currentAccount,

    contract,
    ethereum,
    election,
  } = useContext(VotingContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getEleState = async () => {
  //   try {
  //     if (ethereum) {
  //       const eleSt = await contract.getElectionState();

  //       console.log(`Add Candidate: Loading - ${eleSt.hash} ....`);

  //       console.log(`Add Candidate: Success - ${eleSt.hash} ....`);
  //       setElection(eleSt)
  //     } else {
  //       console.log("No ethereum object");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  // }
  // useEffect(() => {
  //   getEleState();
  // }, [election])

  const verifyZTA = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the login action
      const response = await axios.get("http://127.0.0.1:8009/zta");
      if (response.status == 201) {
        navigate("/verify");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col h-screen">
      <div className="text-center w-[30%] mb-4">
      <img src="/assets/images/logo.png" className="w-56 mx-auto mb-6" />

        <h1 className="text-[20px] font-bold">Polling Process</h1>
      </div>
        <button onClick={verifyZTA} className="bg-black rounded-md px-4 py-2 text-white">
          Cast Your Vote
        </button>
      </div>
    </div>
  );
}
