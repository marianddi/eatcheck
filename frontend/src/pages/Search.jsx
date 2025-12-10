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
  const toggleEaten = (foodId) => {
    let updated;

    if (eatenFoods.includes(foodId)) {
      updated = eatenFoods.filter(id => id !== foodId);
    } else {
      updated = [...eatenFoods, foodId];
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
      onClick={() => toggleEaten(food.foodName)}
      style={{ background:"none", border:"none", fontSize:"18px" }}
      >
        {eatenFoods.includes(food.foodName) ? "✅" : "⬜"}
      </button>
    </div>

          </div>
        ))
        )}
      </div>

      {/* ------- Report.jsx와 동일한 하단 네비게이션 ------- */}
      <BottomNav />
    </div>
  );
};

export default Search;
