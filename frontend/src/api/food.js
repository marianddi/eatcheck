// src/api/food.js
import api from "./axios";

export const searchFood = (keyword) => {
  return api.get("/api/food/search", {
    params: {
      term: keyword,   // ✅ 백엔드와 이름 일치
    },
  });
};

export const getFoodDetail = (foodId) => {
  return api.get(`/api/food/${foodId}`);
};

export const saveFavoriteFood = (foodName) => {
  return api.post("/api/food/favorite", { foodName });
};
