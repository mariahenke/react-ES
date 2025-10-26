export const createCategory = async (categoryService, data) => {
  return await categoryService.create(data);
};
