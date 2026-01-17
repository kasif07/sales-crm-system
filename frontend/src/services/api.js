import axios from "axios";

const API = axios.create({
  baseURL: " https://sales-crm-system.onrender.com"

});

// 🔐 Automatically attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
