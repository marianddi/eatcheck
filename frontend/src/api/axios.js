// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",  // 🔥 백엔드 주소
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (필요하면 토큰 추가)
api.interceptors.request.use(
  (config) => {
    // JWT 토큰 사용 시 — 나중을 위해 구조만 남김
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (디버깅 편하게)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
