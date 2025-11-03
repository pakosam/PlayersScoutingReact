import { IRegister, ILogin } from "../api/apiInterface";
import { axiosInstance } from "../api/axiosInstance";

class AuthRepository {
  async register(credentials: IRegister) {
    const response = await axiosInstance.post(
      "/Authorization/register",
      credentials
    );
    return response.data;
  }

  async login(credentials: ILogin) {
    const response = await axiosInstance.post(
      "/Authorization/login",
      credentials
    );
    localStorage.setItem("loginData", response.data);

    return response.data;
  }
}

export const authRepository = new AuthRepository();
