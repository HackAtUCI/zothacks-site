import axios from "axios";

const api = axios.create({
  baseURL: process.env.IH_API_BASE, 
  withCredentials: true,                
});

export default api;
