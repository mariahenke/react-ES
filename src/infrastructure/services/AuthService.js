import { IAuthService } from "../../application/interfaces/IAuthService.js";
import { authApi } from "../../api/authApi.js";

export class AuthService extends IAuthService {

  async register(data) {
    const response = await authApi.register(data);
    return response.data; // { user, token }
  }

  async login(data) {
    const response = await authApi.login(data);
    return response.data; // { user, token }
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) return null;

    try {
      // const res = await authApi.validateToken(token);
      // return res.data.user;

      return JSON.parse(user);
    } catch (error) {
      return null;
    }
  }

  async refreshToken() {
    try {
      const res = await authApi.refresh();
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return res.data;
    } catch (error) {
      return null;
    }
  }
}
