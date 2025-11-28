import { profileApi } from "../../api/profileApi.js";

export async function getProfiles(userId) {
  const response = await profileApi.getAll(userId);
  return response.data;
}

export async function getProfileById(id) {
  const response = await profileApi.getById(id);
  return response.data;
}

export async function createProfile(data) {
  const response = await profileApi.create(data);
  return response.data;
}

export async function updateProfile(id, data) {
  const response = await profileApi.update(id, data);
  return response.data;
}

export async function deleteProfile(id) {
  const response = await profileApi.delete(id);
  return response.data;
}