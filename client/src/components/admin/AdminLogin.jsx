import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../features/auth/admin/adminSlice";
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, isError, isAdminLoggedIn, message } = useSelector(
    (state) => state.admin
  );
  console.log(admin);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isAdminLoggedIn === true || admin !== null) {
      navigate("/admin");
    }
  }, [admin, isError, isAdminLoggedIn, message, navigate, dispatch]);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("here");
    try {
      // Dispatch the admin login action
      await dispatch(adminLogin({ username, password }));
      // Redirect to admin dashboard after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
          <img src="/assets/images/logo.png" className="w-56 mb-4" />
        </div>
        <form
          onSubmit={handleLogin}
          className="w-full items-center flex flex-col"
        >
          <div class="mb-4 w-[25%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email ID
            </label>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4 w-[25%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="bg-black w-[25%] cursor-pointer text-center text-white px-4 py-2 rounded-md">
            <button className="" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;

// <div className="flex flex-col items-center justify-center h-screen">
//   <div>
//     <img src="/assets/images/logo.png" className="w-56 mb-4" />
//   </div>
//   <form onSubmit={handleLogin} className="w-full items-center flex flex-col">
//     <div class="mb-4 w-[30%]">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         Username
//       </label>

//       <input
//         type="text"
//         placeholder="Rohit"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       />
//     </div>
//     <div class="mb-4 w-[30%]">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         D.O.B
//       </label>

//       <input
//         type="text"
//         placeholder="1990-05-21"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       />
//     </div>

//     <div class="mb-4 w-[30%]">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         Aadhar Number
//       </label>

//       <input
//         type="text"
//         placeholder="3024 **** **** ****"
//         value={aadhar_id}
//         onChange={(e) => setAadharId(e.target.value)}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       />
//     </div>

//     <div class="mb-4 w-[30%]">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         Voter ID
//       </label>

//       <input
//         type="text"
//         placeholder="**** **** ****"
//         value={voter_id}
//         onChange={(e) => setVoterId(e.target.value)}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       />
//     </div>

//     <div className="bg-black w-[30%] cursor-pointer text-center text-white px-4 py-2 rounded-md">
//       <button className="" type="submit">
//         Sign In
//       </button>
//     </div>
//   </form>
// </div>;
