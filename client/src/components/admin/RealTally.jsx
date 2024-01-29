import React, { useContext, useEffect, useState } from "react";
import { VotingContext } from "../../context/VotingContext";
import Navbar from "./Navbar";
export default function RealTally() {
  const { candidates, getCandidates } = useContext(VotingContext);

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div>
        <Navbar />
  
    <div className="flex items-center justify-center flex-col h-screen">
    

      <div className="text-center w-[30%] mb-16">
        <h1 className="text-[20px] font-bold">Live Tally</h1>
        <div className="">Here you can view the live count of votes for each party</div>
      </div>
      <div className="grid grid-cols-2 ">
     

        {candidates.map((item, index) => (
          <div
            key={index}
            className="flex mx-16 items-center justify-center   mb-8 rounded-lg p-4 border-2 border-gray-400 border"
          >
            <img src={item.partyLogo} className="w-16" />
            <div className="ml-4">
              <div>Party Name: <span className="font-medium">{item.description}</span></div>
              <div>Party Symbol: <span className="font-medium">{item.partyName}</span></div>
              <div>Candidate Name: <span className="font-medium">{item.candidateName}</span></div>
              <div>Total Votes: <span className="font-medium">{item.votes}</span></div>
            </div>

            {/* <button >Vote</button> */}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
