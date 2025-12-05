import { goalApi } from "../../api/goalApi";

export async function createGoal(data) {
  const response = await goalApi.create(data);
  return response.data;
}

export async function listGoals(userId) {
  const response = await goalApi.getAll(userId);
  return response.data;
}

export async function updateGoal(id, data) {
  const response = await goalApi.update(id, data);
  return response.data;
}

export async function deleteGoal(id) {
  const response = await goalApi.delete(id);
  return response.data;
}
