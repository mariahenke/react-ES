import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:3000/api",
});

export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};
