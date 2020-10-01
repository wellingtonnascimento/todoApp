import axios from "axios";

const config = {
  baseURL: "http://localhost:5000/rstcom-8c4e1/us-central1/api",
};

const api = axios.create(config);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default api;
