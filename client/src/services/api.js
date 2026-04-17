// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800", // seu backend node depois
});

/*/ interceptor JWT (já pronto)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});*/

export default api;