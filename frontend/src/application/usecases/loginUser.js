export const loginUser = async (authService, email, password) => {
  return await authService.login({ email, password });
};
