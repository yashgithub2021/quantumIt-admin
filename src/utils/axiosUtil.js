import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://api.quantumitinnovation.com",
});

export default axiosInstance;
