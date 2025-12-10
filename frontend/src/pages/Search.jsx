import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchFood } from "../api/food";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [eatenFoods, setEatenFoods] = useState(
    JSON.parse(localStorage.getItem("eatenFoods")) || []
  );

  // 검색 함수
  const handleSearch = async (q) => {
    const query = q || keyword;
    if (!query.trim()) return;

    try {
      const res = await searchFood(query);
      setResults(res.data);
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  // URL ?query= 자동 검색
  useEffect(() => {
    if (initialQuery) {
      setKeyword(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  // 즐겨찾기 토글
  const toggleFavorite = (foodName) => {
    let updated;

    if (favorites.includes(foodName)) {
      updated = favorites.filter((item) => item !== foodName);
    } else {
      updated = [...favorites, foodName];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  
  const toggleEaten = (food) => {
    let updated;
    
    // 이미 선택된 음식인지 확인 (foodName으로 비교)
    const isAlreadySelected = eatenFoods.some(item => item.foodName === food.foodName);

    if (isAlreadySelected) {
      // 이미 있으면 제거
      updated = eatenFoods.filter(item => item.foodName !== food.foodName);
    } else {
      // 없으면 객체 전체 추가
      updated = [...eatenFoods, food];
    }

    setEatenFoods(updated);
    localStorage.setItem("eatenFoods", JSON.stringify(updated));
  };



  return (
    <div style={{ paddingBottom: "80px" }}> 
      {/* ------- Report.jsx와 동일한 상단 Header ------- */}
      <Header
        value={keyword}
        onChange={setKeyword}
        onSearch={() => handleSearch()}
      />

      {/* ------- 검색 결과 본문 ------- */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "15px" }}>검색 결과: {keyword}</h3>

        {results.length === 0 ? (
          <p style={{ color: "#777" }}>검색 결과가 없습니다.</p>
        ) : (
          results.map((food, index) => (
            <div
              key={`${food.foodName}_${index}`}
              style={{
              display:"flex",
              justifyContent:"space-between",
              padding:"12px 0",
              borderBottom:"1px solid #eee"
            }}
          >
            <div>
              <strong>{food.foodName}</strong>
              <div style={{ fontSize:"12px", color:"#777" }}>
              100g | {food.enerc} kcal
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
      {/* 즐겨찾기 */}
      <button
        onClick={() => toggleFavorite(food.foodName)}
        style={{ background:"none", border:"none", fontSize:"18px" }}
      >
        {favorites.includes(food.foodName) ? "★" : "☆"}
      </button>

      {/* 먹은 음식 체크 */}
      <button
      onClick={() => toggleEaten(food)}
      style={{ background:"none", border:"none", fontSize:"18px" }}
      >
        {eatenFoods.some(item => item.foodName === food.foodName) ? "✅" : "⬜"}
      </button>
    </div>

          </div>
        ))
        )}
      </div>
{/* ------- 플로팅 추가하기 버튼 ------- */}
<button
  onClick={() => {
    if (eatenFoods.length === 0) {
      alert("선택한 음식이 없습니다.");
      return;
    }

    const todayFoods =
      JSON.parse(localStorage.getItem("todayFoods")) || [];

    const updated = [...new Set([...todayFoods, ...eatenFoods])];

    localStorage.setItem("todayFoods", JSON.stringify(updated));
    localStorage.removeItem("eatenFoods");

    alert("오늘 먹은 음식으로 추가되었습니다!");
  }}
  style={{
    position: "fixed",
    bottom: "90px",           // ✅ 하단바 위
    left: "50%",               // ✅ 중앙 정렬 핵심
    transform: "translateX(-50%)",
    padding: "14px 32px",
    borderRadius: "30px",
    backgroundColor: "#7AE2A6", // 이미지랑 유사한 연두색
    color: "#000",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
    cursor: "pointer",
    zIndex: 1000
  }}
>
  추가하기
</button>


   
      {/* ------- Report.jsx와 동일한 하단 네비게이션 ------- */}
      <BottomNav />
    </div>
  );
};

export default Search;
