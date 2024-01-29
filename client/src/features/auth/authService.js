import axios from "axios";
const API_URL = "http://127.0.0.1:8009";

const login = async (userData) => {
  const response = await axios.post(API_URL+"/otp" , userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};


const authService = {
    login,
    logout
}

export default authService