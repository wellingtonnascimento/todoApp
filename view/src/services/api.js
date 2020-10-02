import axios from "axios";

const config = {
  baseURL: "https://us-central1-rstcom-8c4e1.cloudfunctions.net/api",
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
