// src/api/user.js
import api from "./axios";

export const login = (userId, password) => {
  return api.post("/auth/login", { userId, password });
};

export const getUserInfo = (userId) => {
  return api.get(`/user/info/${userId}`);
};
