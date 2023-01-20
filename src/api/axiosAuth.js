import axios from "axios";
const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000'
  });
// console.log(localStorage.getItem('accessToken'))
  axiosAuth.defaults.headers.common['x-access-token'] = localStorage.getItem('accessToken')
  export default axiosAuth
