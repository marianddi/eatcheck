// src/api/food.js
import api from "./axios";

export const searchFood = (keyword) => {
  return api.get(`/food/search?query=${encodeURIComponent(keyword)}`);
};

export const getFoodDetail = (foodId) => {
  return api.get(`/api/food/${foodId}`);
};

export const saveFavoriteFood = (foodName) => {
  return api.post("/api/food/favorite", { foodName });
};
