import { userApi } from "../../api/userApi.js";

export async function getUsers(userId) {
  const response = await userApi.getAll(userId);
  return response.data;
}

export async function getUserById(id) {
  const response = await userApi.getById(id);
  return response.data;
}

export async function createUser(data) {
  const response = await userApi.create(data);
  return response.data;
}

export async function updateUser(id, data) {
  const response = await userApi.update(id, data);
  return response.data;
}

export async function deleteUser(id) {
  const response = await userApi.delete(id);
  return response.data;
}