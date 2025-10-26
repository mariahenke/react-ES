export const updateCategory = async (categoryService, id, data) => {
  return await categoryService.update(id, data);
};
