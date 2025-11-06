import { IAuthService } from "../../application/interfaces/IAuthService.js";
import { authApi } from "../../api/authApi.js";

export class AuthService extends IAuthService {
  async register(data) {
    const response = await authApi.register(data);
    return response.data;
  }

  async login(data) {
    const response = await authApi.login(data);
    return response.data;
  }
}
