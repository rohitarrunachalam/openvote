import React, { useContext, useEffect, useState } from "react";
import { VotingContext } from "../../context/VotingContext";
import Navbar from "./Navbar";

export default function ElectionState() {
  const { startElection, endElection, refreshElection } =
    useContext(VotingContext);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center w-[30%] mb-4">
                <h1 className="text-[20px] font-bold">Election Controls</h1>
            </div>
      <div className=" space-x-8">
        <button  className="bg-black px-4 py-2 text-white text-center rounded-md" onClick={startElection}>Start Election</button>
        <button className="bg-black px-4 py-2 text-white text-center rounded-md" onClick={endElection}>End Election</button>
        <button className="bg-black px-4 py-2 text-white text-center rounded-md" onClick={refreshElection}>Reset Election</button>
      </div>
      </div>
      
    </div>
  );
}
