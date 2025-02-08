import axios from "axios";
import { toast } from "react-toastify";

/* --------------- An axios instance with custom configuration -------------- */
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", //  base URL
  timeout: 20000, // timeout of 20 seconds
});

/* ---------------------- handle request configurations --------------------- */
axiosInstance.interceptors.request.use(
  (config) => {
    // modify the request config here (e.g., add headers, tokens, etc.)
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

/* ----------------------- handle responses and errors ---------------------- */
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response directly if successful
    return response;
  },
  (error) => {
    /* ----------------------- Handle specific error cases ---------------------- */
    if (error.message === "Network Error") {
      toast.error("Network error! Please check your internet connection.");
    } else if (
      error.response?.status === 403 ||
      error.response?.status === 401
    ) {
      toast.error("Unauthorized access. Please log in again.");
    } else if (error.response?.status === 500) {
      toast.error("Server error! Please try again later.");
    }
    // Reject the promise with the error
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default axiosInstance;
