import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "/api",  // harus sama dengan proxy prefix
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired atau unauthorized
      Cookies.remove("token"); // hapus token dari cookie
      
      // Redirect ke login
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;