import axios from "axios";
const api = axios.create({
  baseURL: "http://192.168.18.35:3001",
});

console.log("axios file");
console.log(localStorage.getItem("accessToken"));

export default api;
