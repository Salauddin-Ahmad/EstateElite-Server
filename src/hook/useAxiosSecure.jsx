import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "https://estate-elite-server.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = useAuth()
  // request intercepotr to add authorization headers for every
  // secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("request stopped by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      // for 401 / 403 logout the user and move the user to the login
      if (error.response.status === 401 || error.response.status === 403) {
       await logOut(); 
        localStorage.removeItem("access-token");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
