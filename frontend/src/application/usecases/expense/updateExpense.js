export const updateExpense = async (expenseService, id, data) => {
  return await expenseService.update(id, data);
};
