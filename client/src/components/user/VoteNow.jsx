import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { VotingContext } from "../../context/VotingContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function VoteNow() {
  const {
    currentAccount,
    connectWallet,
    votehandler,
    candidates,
    getCandidates,
    receiptID
  } = useContext(VotingContext);

  const navigate = useNavigate()

  useEffect(() => {
    getCandidates();
  }, []);


 

  
  return (
    <div>
      <Navbar />
<div className="flex items-center justify-center flex-col h-screen">
    
    <div className="text-center w-[30%] mb-16">
            <h1 className="text-[20px] font-bold">Candidates List</h1>
            <div className="">Click on the Candiate you wish to poll your Vote</div>
        </div>
  <div className="grid grid-cols-2 ">
    {candidates.map((item, index) => (
      <button
        onClick={() => votehandler(index)}
        key={index}
 
        className="text-left flex mx-16 hover:bg-gray-100 duration-300  items-center justify-center   mb-8 rounded-lg p-4 border-2 border-gray-400 border"
      >
        <img src={item.partyLogo} className="w-16" />
        <div className="ml-4 ">
          <div>Party Name: <span className="font-medium">{item.description}</span></div>
          <div>Party Symbol: <span className="font-medium">{item.partyName}</span></div>
          <div>Candidate Name: <span className="font-medium">{item.candidateName}</span></div>
        </div>

        {/* <button >Vote</button> */}
      </button>
    ))}
  </div>
</div>
    </div>
    
  );
}
