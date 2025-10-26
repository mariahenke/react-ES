export const createExpense = async (expenseService, data) => {
  return await expenseService.create(data);
};
