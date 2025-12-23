import api from "./axios";

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data; // { token }
};
