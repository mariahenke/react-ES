export const registerUser = async (authService, data) => {
  return await authService.register(data);
};
