import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function ZTAVerify() {

    const [ZTA, setZTA] = useState();
    const navigate = useNavigate();
    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            // Dispatch the login action
            const response = await axios.post("http://127.0.0.1:8009/verifyzta", { ZTA });
            if (response.status == 201) {
                navigate("/vote");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
    return (
        <div className="flex items-center justify-center flex-col h-screen">
        <div className="text-center w-[30%] mb-4">
                <h1 className="text-[20px] font-bold">ZTA Verification</h1>
                <div className="">Kindly Enter the OTP that has been sent to your Mobile Number</div>
            </div>

            <div className="w-[30%]">
                <input
                    type="number"
                    placeholder="******"
                    value={ZTA}
                    onChange={(e) => setZTA(e.target.value)}
                    className="shadow appearance-none my-4  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleVerify} className="bg-black w-full cursor-pointer text-center text-white px-4 py-2 rounded-md">

                    Verify
                </button>

            </div>
        </div>
    )
}
