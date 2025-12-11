import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import api from "../api/axios.js";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nickname, setNickname] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  const [recCarb, setRecCarb] = useState(0);
  const [recProtein, setRecProtein] = useState(0);
  const [recFat, setRecFat] = useState(0);


  const [nutriData, setNutriData] = useState({
  carbs: 0,
  protein: 0,
  fat: 0,
  totalKcal: 0
  });

  const percentage = Math.round((nutriData.totalKcal / 2920) * 100);

  const donutSafeData =
  nutriData.carbs + nutriData.protein + nutriData.fat === 0
    ? [1, 1, 1] // placeholder 값
    : [nutriData.carbs, nutriData.protein, nutriData.fat];


  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 로그인 안 했으면
    if (!user) {
      navigate("/login");
      return;
    }

    // 로그인 되어있으면
    setNickname(user.nickname);

  }, [navigate]);







  // 검색 기록 불러오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(stored);
  }, []);

  // 검색 기록 저장
  const storeSearch = (text) => {
    if (!text.trim()) return;

    let newHistory = [text, ...history.filter((h) => h !== text)];
    newHistory = newHistory.slice(0, 5); // 최근 5개 유지

    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // 엔터로 검색 저장
const handleSearchSubmit = () => {
  if (!searchQuery.trim()) return;

  storeSearch(searchQuery);
  setShowHistory(false);

  navigate(`/search?query=${searchQuery}`);
};


  // 차트 데이터
  const barData = {
  labels: ["탄수화물", "단백질", "지방"],
  datasets: [
    {
      label: "권장량",
      backgroundColor: "#bdbdbd",
      data: [recCarb, recProtein, recFat], // 백엔드 추천 값
    },
    {
      label: "섭취량",
      backgroundColor: "#40a4ff",
      data: [nutriData.carbs, nutriData.protein, nutriData.fat],
    }
  ],
}


const donutData = {
  labels: ["탄수화물", "단백질", "지방"],
  datasets: [
    {
      data: donutSafeData,
      backgroundColor: ["#40a4ff", "#ffa640", "#ff6384"],
    },
  ],
};

const barOptions = {
  scales: {
    y: {
      beginAtZero: true,
      max: 500,      // 적당한 max
      ticks: {
        stepSize: 100,
      }
    }
  },
  plugins: {
    legend: {
      display: true
    }
  }
}



  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* ---------- 검색 헤더 ---------- */}
      <Header/>


      {/* ---------- 인사 ---------- */}
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        {nickname ? `${nickname}님 오늘도 화이팅!` : "오늘도 화이팅!"}
      </h3>

      {/* ---------- 첫번째 카드 ---------- */}
      <section
        style={{
          background: "white",
          margin: "20px",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ height: "200px" }}>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              height: "10px",
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                background: "#40a4ff",
                height: "100%",
              }}
            ></div>
          </div>

          <p style={{ marginTop: "8px", fontSize: "14px" }}>
            총 <strong>2920kcal</strong> 중{" "}
            <strong style={{ color: "#0084ff" }}>2310kcal</strong>를 섭취하였습니다.
          </p>
        </div>
      </section>

      {/* ---------- 두번째 카드 ---------- */}
      <section
        style={{
          background: "white",
          margin: "20px",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>권장 영양소</h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <ul style={{ flex: 1, fontSize: "14px" }}>
            <li>🔵 탄수화물 : {nutriData.carbs} g</li>
            <li>🟠 단백질 : {nutriData.protein} g</li>
            <li>🔴 지방 : {nutriData.fat} g</li>
          </ul>


          <div style={{ width: "150px" }}>
            <Doughnut
              data={donutData}
              options={{
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </section>

      {/* ---------- 하단 네비 ---------- */}
      <BottomNav />
    </div>
  );
};

export default Report;
