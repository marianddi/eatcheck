import React, { useEffect, useState } from "react";
import "./Homework.css";

import searchIcon from "./assets/search.png";
import cameraIcon from "./assets/Camera.png";
import medalIcon from "./assets/medal.png";
import trophyIcon from "./assets/trophy.png";

import MenuBar from "./MenuBar";

export default function Homework() {
  const [challengeList, setChallengeList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/challenges/today");
        const data = await res.json();

        setChallengeList(data);
        setCompletedCount(data.filter((c) => c.is_completed).length);
      } catch (err) {
        console.error("API 오류 → 더미데이터 사용");

        const dummy = [
          { id: 1, title: "사진을 찍어 오늘 먹은 음식을 등록해 보세요!", score: 1, progress: 1, goal: 1, is_completed: true },
          { id: 2, title: "오늘의 권장 칼로리를 채워 보세요!", score: 1, progress: 2319, goal: 2920, is_completed: false },
          { id: 3, title: "몸무게를 갱신하세요!", score: 1, progress: 1, goal: 1, is_completed: true },
          { id: 4, title: "3일 연속 단백질을 채워 보세요!", score: 3, progress: 1, goal: 3, is_completed: false }
        ];

        setChallengeList(dummy);
        setCompletedCount(dummy.filter((c) => c.is_completed).length);
      }
    }

    load();
  }, []);

  return (
    <div className="homework-container">

      {/* 검색바 */}
      <header className="search-area">
        <div className="search-box">
          <img src={searchIcon} className="search-icon" />
          <input type="text" placeholder="오늘은 어떤 음식을 드셨나요?" />
          <img src={cameraIcon} className="camera-icon" />
        </div>
      </header>

      {/* 최상단 헤더 (예시 동일 구조) */}
      <div className="hw-header">
        <div className="hw-header-left">
          <img src={medalIcon} className="hw-header-medal" />
          <span className="hw-header-count">{completedCount}</span>
        </div>

        <h1 className="hw-header-title">도 전 과 제</h1>

        <div
          className="hw-header-right"
          onClick={() => (window.location.href = "/ranking")}
        >
          <img src={trophyIcon} className="hw-header-trophy" />
        </div>
      </div>

      {/* 리스트 스크롤 영역 */}
      <div className="hw-scroll">
        {challengeList.map((c) => (
          <div className="hw-item" key={c.id}>

            <div className="hw-item-header">
              <img src={medalIcon} className="hw-item-medal" />
              <span>{c.score}</span>
            </div>

            <div className="hw-item-title">{c.title}</div>

            {c.is_completed ? (
              <button className="hw-complete-btn">완료! 클릭하여 보상 받기!</button>
            ) : (
              <>
                <div className="hw-progress-text">
                  {c.progress}/{c.goal}
                </div>
                <div className="hw-progress-bar">
                  <div
                    className="hw-progress-fill"
                    style={{ width: `${(c.progress / c.goal) * 100}%` }}
                  />
                </div>
              </>
            )}

          </div>
        ))}
      </div>

     <MenuBar active="award" />
    </div>
  );
}
