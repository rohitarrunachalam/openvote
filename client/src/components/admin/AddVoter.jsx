import React, { useContext, useEffect, useState } from "react";
import { VotingContext } from "../../context/VotingContext";
import Navbar from "./Navbar";
import CryptoJS from "crypto-js";
export default function AddVoter() {
  const key = "secretKey";

  const { ethereum, contract } = useContext(VotingContext);
  const [voter, setVoter] = useState("");

  const [formData, setFormData] = useState({
    voterAddress: "",
    aid: 0,
    vid: 0,
    name: "",
    email: "",
    region: "",
    phone: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleVoter = async (event) => {
    event.preventDefault();
    const { voterAddress, aid, vid, name, email, region, phone } = formData;

    const hashedAid = CryptoJS.AES.encrypt(aid, key).toString();
    const hashedVid = CryptoJS.AES.encrypt(vid, key).toString();
    const hashedPhone = CryptoJS.AES.encrypt(phone, key).toString();
    const hashedName = CryptoJS.AES.encrypt(name, key).toString();
    const hashedEmail = CryptoJS.AES.encrypt(email, key).toString();
    const hashedRegion = CryptoJS.AES.encrypt(region, key).toString();

    try {
      if (ethereum) {
        const addVoter = await contract.addVoter(
          voterAddress,
          hashedAid,
          hashedVid,
          hashedName,
          hashedEmail,
          hashedRegion,
          hashedPhone
        );

        console.log(`Add Voter: Loading - ${addVoter.hash} ....`);
        await addVoter.wait();
        console.log(`Add Voter: Success - ${addVoter.hash} ....`);
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
      <div className="flex flex-col items-center justify-center  py-16">
        <form
          onSubmit={handleVoter}
          className="w-full items-center flex flex-col"
        >
          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="voterAddress"
              value={formData.voterAddress}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Aadhar ID
            </label>
            <input
              type="number"
              name="aid"
              value={formData.aid}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Voter ID
            </label>
            <input
              type="number"
              name="vid"
              value={formData.vid}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Region
            </label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <div class="mb-4 w-[30%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <button type="submit" className="bg-black w-[30%] cursor-pointer text-center text-white px-4 py-2 rounded-md">Add Voter</button>

        </form>
      </div>
    </div>
  );
}
