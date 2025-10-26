export const deleteCategory = async (categoryService, id) => {
  return await categoryService.delete(id);
};
