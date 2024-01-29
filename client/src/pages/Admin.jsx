import { AiFillPlayCircle } from "react-icons/ai";
import { VotingContext } from "../context/VotingContext";
import React, { useContext, useEffect, useState } from "react";
import AddCandidate from "../components/admin/AddCandidate";
import AddVoter from "../components/admin/AddVoter";
import ElectionState from "../components/admin/ElectionState";
import RealTally from "../components/admin/RealTally";
import Navbar from "../components/admin/Navbar";


export default function Admin() {
  const {
    currentAccount,
    connectWallet,
   
  } = useContext(VotingContext);
 





  return (
    <div>

   <Navbar />
     <div className="flex flex-col items-center justify-center h-screen">
     <div className="text-center w-[30%] mb-4">
      <img src="/assets/images/logo.png" className="w-56 mx-auto mb-6" />
                <h1 className="text-[20px] font-bold">Welcome Admin</h1>
            </div>
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
      <p className="font-medium">Current Account: <span className="text-gray-600">{currentAccount}</span></p>

     </div>
     
      
    
    </div>
  );
}
