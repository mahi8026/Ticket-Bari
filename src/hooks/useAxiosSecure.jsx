import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Create the axios instance outside the hook to avoid recreating it on every render
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // Ensure this matches your server port
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // 1. Intercept Requests: Add the token to the header
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 2. Intercept Responses: Handle 401/403 errors (invalid token)
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;
      
      // If the user is unauthorized (401) or forbidden (403), log them out
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  // ✅ CRITICAL FIX: Return the instance directly, NOT an object like { axiosSecure }
  return axiosSecure;
};

export default useAxiosSecure;