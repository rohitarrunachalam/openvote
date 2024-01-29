import React, { useContext, useEffect, useState } from "react";
import { VotingContext } from "../../context/VotingContext";
import Navbar from "./Navbar";

export default function AddCandidate() {
  const { ethereum, contract } = useContext(VotingContext);

  const [partyName, setPartyName] = useState("");
  const [candidateName, setCandidateName] = useState("");

  const [partyLogo, setPartyLogo] = useState("");
  const [description, setDescription] = useState("");

  const handleCandidate = async () => {
    try {
      if (ethereum) {
        const addCadidate = await contract.addCandidate(
          partyName,
          candidateName,
          partyLogo,
          description
        );

        console.log(`Add Candidate: Loading - ${addCadidate.hash} ....`);
        await addCadidate.wait();
        console.log(`Add Candidate: Success - ${addCadidate.hash} ....`);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full items-center flex flex-col">

     
        <div class="mb-4 w-[30%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Party Abbrevation
          </label>

          <input
            type="text"
            onChange={(e) => {
              setPartyName(e.target.value);
            }}
            value={partyName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4 w-[30%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Party Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4 w-[30%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Candidate Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setCandidateName(e.target.value);
            }}
            value={candidateName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4 w-[30%]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Party Logo
          </label>
          <input
            type="text"
            onChange={(e) => {
              setPartyLogo(e.target.value);
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            }}
            value={partyLogo}
          />
        </div>
        

        <button onClick={handleCandidate} className="bg-black w-[30%] cursor-pointer text-center text-white px-4 py-2 rounded-md">Add Candidate</button>

      
        </div>
      </div>
    </div>
  );
}
