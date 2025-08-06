import axios from "axios";

export const request = async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // config.headers.setAuthorization(`Bearer ${token}`);
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("Token set in request headers:", config.headers["Authorization"]);
    return config;
  }

  return config;
};

const ApiInstance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: import.meta.env.VITE_BACKEND_URL, // Thay thế bằng URL của API thực tế
});

ApiInstance.interceptors.request.use(request);

export default ApiInstance;
