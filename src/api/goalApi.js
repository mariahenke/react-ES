import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/goal",
});

export const goalApi = {
  create: (data) => api.post("/", data),
  getAll: (userId) => api.get(`/${userId}`),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`),
};
