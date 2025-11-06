export const deleteExpense = async (expenseService, id) => {
  return await expenseService.delete(id);
};
