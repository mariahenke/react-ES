import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

export const userApi = {
  getAll: () => api.get(`/`),
  getById: (id) => api.get(`/${id}`),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`),
};
