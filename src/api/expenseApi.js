import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/expense",
});

export const expenseApi = {
  create: (investorId, data) => api.post(`/investor/${investorId}`, data),
  getAll: (investorId) => api.get(`/investor/${investorId}`),
  getById: (id) => api.get(`/${id}`),
  update: (id, data) => api.put(`/${id}`, data),
  delete: (id) => api.delete(`/${id}`),
};
