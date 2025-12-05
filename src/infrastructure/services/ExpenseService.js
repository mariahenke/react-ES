import { expenseApi } from "../../api/expenseApi.js";

export async function getExpenses(investorId) {
  const response = await expenseApi.getAll(investorId);
  return response.data;
}

export async function getExpenseById(investorId, id) {
  const response = await expenseApi.getById(investorId, id);
  return response.data;
}

export async function createExpense(investorId, data) {
  const response = await expenseApi.create(investorId, data);
  return response.data;
}

export async function updateExpense(investorId, id, data) {
  const response = await expenseApi.update(investorId, id, data);
  return response.data;
}

export async function deleteExpense(investorId, id) {
  const response = await expenseApi.delete(investorId, id);
  return response.data;
}

import { categoryApi } from "../../api/categoryApi.js";

export async function getCategories() {
  const response = await categoryApi.getAll();
  return response.data;
}
