import useAuth from "../hooks/useAuth";
import axios from "./axios";

// Set config defaults when creating the instance

const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000'
  });
  
  // Alter defaults after instance has been created

  axiosAuth.defaults.headers.common['x-access-token'] = localStorage.getItem('accessToken')

  export default axiosAuth