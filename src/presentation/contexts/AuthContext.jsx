import { createContext, useEffect, useState } from "react";
import { AuthService } from "../../infrastructure/services/AuthService";

export const AuthContext = createContext();

const authService = new AuthService();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const loggedUser = await authService.getCurrentUser();
      if (loggedUser) setUser(loggedUser);
      setLoading(false);
    }
    loadSession();
  }, []);

  async function login(credentials) {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
