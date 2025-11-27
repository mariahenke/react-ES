// src/infrastructure/services/ExpenseService.js
import { expenseApi } from "../../api/expenseApi.js";

export async function getExpenses(userId) {
  console.log('userId');
  console.log(userId);
  const response = await expenseApi.getAll(userId);
  return response.data;
}

export async function getExpenseById(id) {
  const response = await expenseApi.getById(id);
  return response.data;
}

export async function createExpense(data) {
  const response = await expenseApi.create(data);
  return response.data;
}

export async function updateExpense(id, data) {
  const response = await expenseApi.update(id, data);
  return response.data;
}

export async function deleteExpense(id) {
  const response = await expenseApi.delete(id);
  return response.data;
}

// (Novo) para o select de categorias:
import { categoryApi } from "../../api/categoryApi.js";

export async function getCategories() {
  const response = await categoryApi.getAll();
  return response.data;
}
