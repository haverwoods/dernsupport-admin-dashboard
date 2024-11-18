import axios from "axios";




export const http = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

