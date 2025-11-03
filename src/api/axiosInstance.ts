import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:7066/api",
  timeout: 1000,
});

const nonAuthRoutes = ["/register", "/login"];

axiosInstance.interceptors.request.use((config) => {
  const path = config.url || "";
  if (nonAuthRoutes.includes(path)) return config;

  const bearerToken = localStorage.getItem("loginData") || "";
  config.headers.Authorization = `Bearer ${bearerToken}`;
  return config;
});
