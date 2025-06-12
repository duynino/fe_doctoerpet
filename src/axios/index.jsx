import axios from "axios";

export const request = async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // config.headers.setAuthorization(`Bearer ${token}`);
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  }

  return config;
};

const ApiInstance = axios.create({
  baseURL: "http://localhost:8080",
});

ApiInstance.interceptors.request.use(request);

export default ApiInstance;
