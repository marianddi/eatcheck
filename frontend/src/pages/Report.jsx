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
  const [nickname, setNickname] = useState("");
  const [recCarb, setRecCarb] = useState(0);
  const [recProtein, setRecProtein] = useState(0);
  const [recFat, setRecFat] = useState(0);
  const [todayFoods, setTodayFoods] = useState([]);



  const [nutriData, setNutriData] = useState({
  carbs: 0,
  protein: 0,
  fat: 0,
  totalKcal: 0
  });

  const percentage = Math.min(Math.round((nutriData.totalKcal / 2920) * 100), 100);

  const donutSafeData =
  nutriData.carbs + nutriData.protein + nutriData.fat === 0
    ? [1, 1, 1] // placeholder 값
    : [nutriData.carbs, nutriData.protein, nutriData.fat];


  const navigate = useNavigate();

  useEffect(() => {
  const todayFoods = JSON.parse(localStorage.getItem("todayFoods")) || [];

  if (todayFoods.length > 0) {
    const totals = todayFoods.reduce(
      (acc, food) => {
        // 백엔드 엔티티(chocdf, prot, fatce, enerc) 필드명을 사용
        const carbs = Number(food.chocdf) || 0; 
        const protein = Number(food.prot) || 0;
        const fat = Number(food.fatce) || 0;
        const kcal = Number(food.enerc) || 0;

        return {
          carbs: acc.carbs + carbs,
          protein: acc.protein + protein,
          fat: acc.fat + fat,
          totalKcal: acc.totalKcal + kcal,
        };
      },
      { carbs: 0, protein: 0, fat: 0, totalKcal: 0 }
    );

    setNutriData({
      carbs: Math.round(totals.carbs),
      protein: Math.round(totals.protein),
      fat: Math.round(totals.fat),
      totalKcal: Math.round(totals.totalKcal),
    });
  }
}, []);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 1. 로그인 체크
    if (!user) {
        navigate("/login");
        return;
    }

    // 2. 닉네임 설정
    setNickname(user.nickname);

    // 3. 권장 영양소(프로필) 정보 로드 함수
    const fetchRecommendedNutrients = async () => {
        try {
            // 💡 [수정]: Login.jsx에서 저장한 'userId'를 사용하고 백틱을 사용하여 URL에 삽입합니다.
            const userIdToFetch = user.userId; 

            if (!userIdToFetch) {
                 console.error("사용자 ID를 찾을 수 없습니다.");
                 return;
            }

            // 백엔드 경로: /profile/{userId} 호출
            const profileRes = await api.get(`/profile/${userIdToFetch}`);
            const profileData = profileRes.data; // 응답 구조에 맞게 수정 (예: .data.data)
            setRecCarb(profileData.recommendedCarb);
            // 상태 업데이트
            setRecCarb(profileData.recommendedCarb);
            setRecProtein(profileData.recommendedProtein);
            setRecFat(profileData.recommendedFat);
            
        } catch (error) {
            console.error("권장 영양소 로드 실패", error);
        }
    };

    fetchRecommendedNutrients();

}, [navigate]);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("todayFoods")) || [];
  setTodayFoods(stored);
}, []);


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
            <strong style={{ color: "#0084ff" }}>{nutriData.totalKcal}kcal</strong>를 섭취하였습니다.
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
