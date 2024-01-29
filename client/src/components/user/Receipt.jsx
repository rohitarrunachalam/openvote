import React, { useContext, useEffect, useState } from "react";
import { VotingContext } from "../../context/VotingContext";
import Navbar from "./Navbar";
export default function Receipt() {
  const [partyName, setPartyName] = useState(null);
  const [candidateName, setCandidateName] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);

  const { receiptID, contract } = useContext(VotingContext);
  const imageUrls = [
    "https://openvote.blob.core.windows.net/openvote/img_1.webp",
    "https://openvote.blob.core.windows.net/openvote/img_2.webp",
    "https://openvote.blob.core.windows.net/openvote/img_3.webp",
    "https://openvote.blob.core.windows.net/openvote/img_4.webp",
    "https://openvote.blob.core.windows.net/openvote/img_5.webp"
  ];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const getVoterBill = async () => {
    try {
      if (ethereum) {
        console.log(receiptID);
        const voterBill = await contract.getVoterBill(receiptID);

        console.log(`Add Candidate: Loading - ${voterBill.hash} ....`);

        console.log(`Add Candidate: Success - ${voterBill.hash} ....`);
        console.log(voterBill);
        setPartyName(voterBill[0]);
        setCandidateName(voterBill[1]);
        setTimeStamp(voterBill[2].toNumber());
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const date = new Date(timeStamp * 1000);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC", // Adjust to your desired time zone
  };

  const formattedDate = date.toLocaleString("en-US", options);

  useEffect(() => {
    getVoterBill();
  }, []);
  return (
    <div>
        <Navbar />
   
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="text-center w-[30%] mb-4">
        <h1 className="text-[20px] font-bold">Your Vote has been Polled Successfully</h1>
        <div className="">
          Below is a receipt of your vote
        </div>
      </div>
      <div>
      <img src={imageUrls[randomIndex]} className="w-64" />
      <div>Party Name <span>{partyName}</span></div>
      <div>Candidate Name <span>{candidateName}</span></div>
      <div>Date & Time <span>{formattedDate}</span></div>
      </div>
      </div>
    </div>
  );
}
