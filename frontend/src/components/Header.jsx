import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  // ▷ 검색 기록 초기 로딩
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(stored);
  }, []);

  // ▷ 검색 기록 저장
  const storeSearch = (text) => {
    if (!text.trim()) return;

    let newHistory = [text, ...history.filter((h) => h !== text)];
    newHistory = newHistory.slice(0, 5); // 최근 5개 유지

    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // ▷ 검색 실행 (엔터 또는 버튼)
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    storeSearch(searchQuery);
    setShowHistory(false);

    navigate(`/search?query=${searchQuery}`);
  };

  // ▷ 검색 기록 클릭 시
  const handleSelectHistory = (item) => {
    setSearchQuery(item);
    setShowHistory(false);
    navigate(`/search?query=${item}`);
  };

  // ▷ 검색 기록 전체 삭제
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div
      style={{
        background: "white",
        padding: "12px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* 검색창 */}
      <input
        value={searchQuery}
        onFocus={() => setShowHistory(true)}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="음식을 검색하세요"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "15px",
        }}
      />

      {/* 검색 기록 드롭다운 */}
      {showHistory && history.length > 0 && (
        <div
          style={{
            background: "#fff",
            marginTop: "8px",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectHistory(item)}
              style={{
                padding: "8px 5px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item}
            </div>
          ))}

          {/* 기록 삭제 버튼 */}
          <button
            onClick={clearHistory}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "8px",
              background: "#f0f0f0",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            검색 기록 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
