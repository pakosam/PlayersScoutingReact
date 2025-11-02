import { IRegister } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const authRepository = {
  register: async (
    registerData: Omit<IRegister, "id">
  ): Promise<IRegister | undefined> => {
    const response = await fetch(`${url}/Authorization/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) throw new Error(`Failed to register: ${response.status}`);

    return;
  },
};
