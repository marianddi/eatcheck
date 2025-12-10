import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "./css/SlideWrapper.css";
import "./css/Homework.css";
import "./css/RankingPage.css";
import "./css/SearchBar.css";
import "./css/MenuBar.css";

import searchIcon from "./assets/search.png";
import cameraIcon from "./assets/Camera.png";
import medalIcon from "./assets/medal.png";
import trophyIcon from "./assets/trophy.png";
import backIcon from "./assets/back.png";

import MenuBar from "./MenuBar";

// 안전하게 Header / BottomNav 로드 (없으면 fallback 사용)
function safeLoad(componentName, fallback) {
  try {
    const Comp = require(`../components/${componentName}`).default;
    return <Comp />;
  } catch (err) {
    return fallback;
  }
}

// JWT 유저 아이디 가져오기
function getUserIdFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return 1;

    const decoded = jwtDecode(token);
    return decoded.userId || decoded.id || 1;
  } catch {
    return 1;
  }
}

export default function HomeworkRankingWrapper() {
  const [page, setPage] = useState("homework");

  // Homework 상태
  const [challengeList, setChallengeList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // Ranking 상태
  const [top10, setTop10] = useState([]);
  const [myRank, setMyRank] = useState(null);

  // ------------------------
  // Homework 로드
  // ------------------------
  async function loadHomework() {
    try {
      const userId = getUserIdFromToken();
      const res = await fetch(`http://localhost:8080/challenge2/recommend?userId=${userId}`);

      if (!res.ok) throw new Error("서버 오류");

      const json = await res.json();
      const data = json.data;

      setTotalScore(data.totalScore);

      const converted = data.challenges.map(c => ({
        id: c.challengeId,
        title: c.title,
        score: c.score,
        progress: c.progress,
        goal: c.goal,
        is_completed: c.completed,
      }));

      setChallengeList(converted);
      setCompletedCount(converted.filter(c => c.is_completed).length);

    } catch (err) {
      console.error("챌린지 로드 실패", err);
    }
  }

  useEffect(() => {
    loadHomework();
  }, []);

  // ------------------------
  // 완료 처리
  // ------------------------
  async function handleComplete(c) {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken();

      const res = await fetch("http://localhost:8080/challenge/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          challengeId: c.id
        })
      });

      const json = await res.json();
      console.log("완료 처리 결과:", json);

      loadHomework();
    } catch (err) {
      console.error("완료 처리 실패", err);
    }
  }

  // ------------------------
  // 내 랭킹 정보 로드
  // ------------------------
  async function loadMyRank() {
    try {
      const userId = getUserIdFromToken();
      const res = await fetch(`http://localhost:8080/ranking/me?userId=${userId}`);

      if (!res.ok) throw new Error("서버 오류");

      const me = await res.json();

      setMyRank({
        user_id: me.userId,
        nickname: me.nickname,
        score: me.totalScore,
        rank: me.rank,
        profile_img: me.profileImg || null,
      });

    } catch (err) {
      console.error("내 랭킹 로드 실패");
    }
  }

  // ------------------------
  // Top10 로드
  // ------------------------
  useEffect(() => {
    if (page !== "ranking") return;

    async function loadRanking() {
      try {
        const userId = getUserIdFromToken();
        const res = await fetch(`http://localhost:8080/ranking/top10?userId=${userId}`);

        if (!res.ok) throw new Error("서버 오류");

        const json = await res.json();
        const data = json.data;

        setTop10(
          data.top10.map(u => ({
            user_id: u.userId,
            nickname: u.nickname,
            score: u.score,
            rank: u.rank,
            profile_img: u.profileImage
          }))
        );

        setMyRank({
          user_id: data.me.userId,
          nickname: data.me.nickname,
          score: data.me.score,
          rank: data.me.rank,
          profile_img: data.me.profileImage
        });

      } catch (err) {
        console.error("랭킹 로드 실패", err);
      }
    }

    loadRanking();
  }, [page]);

  // ------------------------
  // Header / BottomNav Fallback UI
  // ------------------------
  const headerUI = safeLoad("Header", (
    <div className="fixed-top">
      <div className="search-area">
        <div className="search-box">
          <img src={searchIcon} className="search-icon" />
          <input placeholder="오늘은 어떤 음식을 드셨나요?" />
          <img src={cameraIcon} className="camera-icon" />
        </div>
      </div>
    </div>
  ));

  const bottomUI = safeLoad("BottomNav", (
    <div className="fixed-bottom">
      <MenuBar active="award" />
    </div>
  ));

  // ------------------------
  // 렌더링 시작
  // ------------------------
  return (
    <div className="page-container">

      {/* 상단 Header 영역 */}
      {headerUI}

      <div className="slide-wrapper">

        {/* HOMEWORK PAGE */}
        <div className={`slide-page ${page === "homework" ? "active" : "left-hidden"}`}>
          <div className="homework-container">

            {/* 상단 점수 표시 */}
            <div className="hw-header">
              <div className="hw-header-left">
                <img src={medalIcon} className="hw-header-medal" />
                <span className="hw-header-count">{totalScore}</span>
              </div>

              <h1 className="hw-header-title">도 전 과 제</h1>

              <div className="hw-header-right" onClick={() => setPage("ranking")}>
                <img src={trophyIcon} className="hw-header-trophy" />
              </div>
            </div>

            {/* 챌린지 리스트 */}
            <div className="hw-scroll">
              {challengeList.map(c => (
                <div className="hw-item" key={c.id}>

                  <div className="hw-item-header">
                    <img src={medalIcon} className="hw-item-medal" />
                    <span>{c.score}</span>
                  </div>

                  <div className="hw-item-title">{c.title}</div>

                  {c.progress >= c.goal ? (
                    <button className="hw-complete-btn" onClick={() => handleComplete(c)}>
                      완료! 보상 받기!
                    </button>
                  ) : (
                    <>
                      <div className="hw-progress-text">{c.progress}/{c.goal}</div>
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

          </div>
        </div>

        {/* RANKING PAGE */}
        <div className={`slide-page ${page === "ranking" ? "active" : "right-hidden"}`}>
          <div className="ranking-container">

            <div className="rank-scroll-area">

              <div className="ranking-header">
                <img src={backIcon} className="back-icon" onClick={() => setPage("homework")} />
                <h1 className="ranking-title">랭 킹</h1>
              </div>

              {/* podium */}
              {top10.length >= 3 && (
                <div className="podium-wrapper">

                  <div className="podium-item">
                    <div className="profile-circle" />
                    <span className="nickname">{top10[1].nickname}</span>
                    <div className="top3-score">
                      <img src={medalIcon} className="medal-icon" />
                      <span>{top10[1].score}</span>
                    </div>
                    <div className="bar second" />
                  </div>

                  <div className="podium-item">
                    <div className="profile-circle" />
                    <span className="nickname">{top10[0].nickname}</span>
                    <div className="top3-score">
                      <img src={medalIcon} className="medal-icon" />
                      <span>{top10[0].score}</span>
                    </div>
                    <div className="bar first" />
                  </div>

                  <div className="podium-item">
                    <div className="profile-circle" />
                    <span className="nickname">{top10[2].nickname}</span>
                    <div className="top3-score">
                      <img src={medalIcon} className="medal-icon" />
                      <span>{top10[2].score}</span>
                    </div>
                    <div className="bar third" />
                  </div>

                </div>
              )}

              <div className="podium-bottom-bar"></div>

              {/* 랭킹 리스트 */}
              <ul className="rank-list">
                {top10.slice(3).map(u => (
                  <li key={u.user_id} className="rank-item">
                    <span>{u.rank}</span>

                    <div className="rank-user-img">
                      {u.profile_img ? (
                        <img src={u.profile_img} alt={u.nickname} />
                      ) : (
                        <div className="img-placeholder" />
                      )}
                    </div>

                    <span className="rank-username">{u.nickname}</span>

                    <span className="rank-score">
                      <img src={medalIcon} className="medal-icon" />
                      {u.score}
                    </span>
                  </li>
                ))}
              </ul>

            </div>

            {/* 내 정보 */}
            {myRank && (
              <>
                <div className="my-info-box">
                  <div className="left-section">
                    <span className="rank">{myRank.rank}</span>

                    <div className="my-profile-img">
                      {myRank.profile_img ?
                        <img src={myRank.profile_img} alt="my-profile" /> :
                        <div className="img-placeholder" />}
                    </div>

                    <span className="nickname">{myRank.nickname}</span>
                  </div>

                  <span className="score">
                    <img src={medalIcon} className="medal-icon" />
                    {myRank.score}
                  </span>
                </div>

                <div className="my-info-bottom-bar"></div>
                {bottomUI}
              </>
            )}

          </div>
        </div>

      </div>

      {/* 하단 네비게이션 */}
      {bottomUI}

    </div>
  );
}
