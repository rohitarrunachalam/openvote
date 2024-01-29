import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

//   const [response, setResponse] = useState(""); // State to hold the API response message
//   const [isReqSuccess, setIsReqSuccess] = useState(false); // State to track the success state

//   const [displayMsg, setMsg] = useState("")

//   return (
//     <div className="flex">

//       <div className="">
//         <div className="">

//           <form onSubmit={handleLogin}>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={``}
//               />
//             </div>
//             <div>
//               <input
//                 type="text"

//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 className={``}
//               />
//             </div>
//             <div>
//               <input
//                 type="text"

//                 value={aadhar_id}
//                 onChange={(e) => setAadharId(e.target.value)}
//                 className={``}
//               />
//             </div>
//             <div>
//               <input
//                 type="text"

//                 value={voter_id}
//                 onChange={(e) => setVoterId(e.target.value)}
//                 className={``}
//               />
//             </div>

//             {/* <p className="text-red-500 text-[14px] font-medium">{displayMsg}</p> */}

//             <div className="">
//               <button className="w-full outfit-500" type="submit">
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Login;

import React from "react";

export default function Login() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [aadhar_id, setAadharId] = useState("");
    const [voter_id, setVoterId] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Dispatch the login action
            const response = await axios.post("http://127.0.0.1:8009/login", {
                name,
                dob,
                aadhar_id,
                voter_id,
            });
            if (response.status == 201) {
                navigate("/otp");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <img src="/assets/images/logo.png"  className="w-56 mb-4"/>
            </div>
            <form onSubmit={handleLogin} className="w-full items-center flex flex-col">
               
                <div class="mb-4 w-[30%]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                       
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Rohit"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div class="mb-4 w-[30%]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                  
                    >
                        D.O.B
                    </label>

                    <input
                        type="text"
                        placeholder="1990-05-21"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div class="mb-4 w-[30%]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        
                    >
                        Aadhar Number
                    </label>

                    <input
                        type="text"
                        placeholder="3024 **** **** ****"
                        value={aadhar_id}
                        onChange={(e) => setAadharId(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div class="mb-4 w-[30%]">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        
                    >
                        Voter ID
                    </label>

                    <input
                        type="text"
                        placeholder="**** **** ****"
                        value={voter_id}
                        onChange={(e) => setVoterId(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>


                <div className="bg-black w-[30%] cursor-pointer text-center text-white px-4 py-2 rounded-md">
                    <button className="" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
