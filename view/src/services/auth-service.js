import api from "./api";

export default {
  login: (body) => api.post("login", body),
  signup: (body) => api.post("signup", body),
};
