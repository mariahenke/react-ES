export const registerUser = async (authService, name, email, password) => {
  return await authService.register({ name, email, password });
};
