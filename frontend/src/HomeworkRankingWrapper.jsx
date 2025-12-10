import React, { useState, useEffect } from "react";
import "./SlideWrapper.css";
import "./Homework.css";
import "./RankingPage.css";

import searchIcon from "./assets/search.png";
import cameraIcon from "./assets/Camera.png";
import medalIcon from "./assets/medal.png";
import trophyIcon from "./assets/trophy.png";
import backIcon from "./assets/back.png";

import MenuBar from "./MenuBar";

export default function HomeworkRankingWrapper() {
  const [page, setPage] = useState("homework");

  /* -------------------- Homework State -------------------- */
  const [challengeList, setChallengeList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  /* -------------------- Homework API -------------------- */
  useEffect(() => {
    async function loadHomework() {
      try {
        const res = await fetch("http://localhost:8080/challenge/challengeList?userId=1");
        
        // HTTP 오류 처리
        if (!res.ok) {
          console.warn(`⚠️ 챌린지 API HTTP 오류: ${res.status} ${res.statusText}`);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("🔥 챌린지 추천 데이터:", data);

        // 백엔드 응답 구조에 맞게 가공 (구조 매핑)
        const actualData = data?.data || data;
        
        // 배열 체크 및 필드명 매핑
        let converted = [];
        if (Array.isArray(actualData)) {
          converted = actualData.map(item => ({
            id: item?.challengeId || item?.id || 0,
            title: item?.challengeName || item?.name || item?.title || "제목 없음",
            score: item?.score || 1,
            progress: item?.progress || 0,
            goal: item?.target || item?.goal || 1,
            is_completed: item?.completed || false
          }));
        } else if (actualData && typeof actualData === 'object') {
          // 단일 객체인 경우
          converted = [{
            id: actualData?.challengeId || actualData?.id || 0,
            title: actualData?.name || actualData?.title || "제목 없음",
            score: actualData?.score || 1,
            progress: 0,
            goal: 1,
            is_completed: false
          }];
        }

        // 유효한 데이터인지 확인
        if (converted.length === 0) {
          console.warn("⚠️ 챌린지 데이터가 비어있습니다. 더미를 사용합니다.");
          throw new Error("Empty data");
        }

        setChallengeList(converted);
        setCompletedCount(converted.filter(c => c.is_completed).length);

      } catch (err) {
        console.error("❌ 챌린지 불러오기 실패 → 더미 사용", err.message || err);
        
        // 더미 데이터를 실제 API 구조와 일치시킴
        const dummy = [
          { id: 1, title: "사진을 찍어 오늘 먹은 음식을 등록해 보세요!", score: 1, progress: 1, goal: 1, is_completed: true },
          { id: 2, title: "오늘의 권장 칼로리를 채워 보세요!", score: 1, progress: 2319, goal: 2920, is_completed: false },
          { id: 3, title: "몸무게를 갱신하세요!", score: 1, progress: 1, goal: 1, is_completed: true },
          { id: 4, title: "3일 연속 단백질을 채워 보세요!", score: 3, progress: 1, goal: 3, is_completed: false }
        ];

        setChallengeList(dummy);
        setCompletedCount(dummy.filter(c => c.is_completed).length);
      }
    }

    loadHomework();
  }, []);


  /* -------------------- Ranking State -------------------- */
  const [top10, setTop10] = useState([]);
  const [myRank, setMyRank] = useState(null);

  /* -------------------- My Rank Loader -------------------- */
  async function loadMyRank() {
    try {
      const res = await fetch("http://localhost:8080/ranking/me?userId=1");
      
      if (!res.ok) {
        console.warn(`⚠️ 내 랭킹 API HTTP 오류: ${res.status} ${res.statusText}`);
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const me = await res.json();
      
      // 구조 매핑
      const actualMe = me?.data || me;
      
      // 유효성 검사
      if (!actualMe || !actualMe.userId) {
        console.warn("⚠️ 내 랭킹 데이터가 유효하지 않습니다.");
        throw new Error("Invalid data");
      }

      setMyRank({
        user_id: actualMe.userId || actualMe.id,
        nickname: actualMe.nickname || "알 수 없음",
        score: actualMe.totalScore || actualMe.score || 0,
        rank: actualMe.rank || 999,
        profile_img: actualMe.profileImg || null,
      });

    } catch (err) {
      console.error("❌ 내 랭킹 불러오기 실패 → 더미", err.message || err);

      setMyRank({
        user_id: 999,
        nickname: "나(더미)",
        score: 10,
        rank: 15,
        profile_img: null,
      });
    }
  }

  /* -------------------- Ranking API -------------------- */
  useEffect(() => {
    if (page !== "ranking") return;

    async function loadRanking() {
      try {
        // 상위 10명
        const res = await fetch("http://localhost:8080/ranking/top10");
        
        if (!res.ok) {
          console.warn(`⚠️ 랭킹 API HTTP 오류: ${res.status} ${res.statusText}`);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("🔥 서버 랭킹 데이터:", data);

        // 구조 매핑
        const actualData = data?.data || data;
        
        // 배열 체크 및 필드명 매핑
        const converted = (Array.isArray(actualData) ? actualData : [])
          .map((u, index) => ({
            user_id: u?.userId || u?.id || 0,
            nickname: u?.nickname || "익명",
            score: u?.totalScore || u?.score || 0,
            rank: index + 1,
            profile_img: u?.profileImg || null
          }));

        // 유효성 검사
        if (converted.length === 0) {
          console.warn("⚠️ 랭킹 데이터가 비어있습니다. 더미를 사용합니다.");
          throw new Error("Empty data");
        }

        setTop10(converted);

        // 내 랭킹
        await loadMyRank();

      } catch (err) {
        console.error("❌ 랭킹 실패 → 더미 사용", err.message || err);
        
        const dummyTop = Array.from({ length: 10 }, (_, i) => ({
          user_id: i + 1,
          nickname: `더미사용자 ${i + 1}`,
          score: 30 - i,
          rank: i + 1,
          profile_img: null,
        }));

        setTop10(dummyTop);
        await loadMyRank();
      }
    }

    loadRanking();
  }, [page]);


  return (
    <div className="page-container">

      {/* 🔝 상단 검색바 */}
      <div className="fixed-top">
        <div className="search-area">
          <div className="search-box">
            <img src={searchIcon} className="search-icon" />
            <input placeholder="오늘은 어떤 음식을 드셨나요?" />
            <img src={cameraIcon} className="camera-icon" />
          </div>
        </div>
      </div>

      {/* 🔥 슬라이드 영역 */}
      <div className="slide-wrapper">

        {/* ---------------- HOMEWORK PAGE ---------------- */}
        <div className={`slide-page ${page === "homework" ? "active" : "left-hidden"}`}>
          <div className="homework-container">

            <div className="hw-header">
              <div className="hw-header-left">
                <img src={medalIcon} className="hw-header-medal" />
                <span className="hw-header-count">{completedCount}</span>
              </div>

              <h1 className="hw-header-title">도 전 과 제</h1>

              <div className="hw-header-right" onClick={() => setPage("ranking")}>
                <img src={trophyIcon} className="hw-header-trophy" />
              </div>
            </div>

            <div className="hw-scroll">
              {challengeList.map(c => (
                <div className="hw-item" key={c.id}>
                  <div className="hw-item-header">
                    <img src={medalIcon} className="hw-item-medal" />
                    <span>{c.score}</span>
                  </div>

                  <div className="hw-item-title">{c.title}</div>

                  {c.is_completed ? (
                    <button className="hw-complete-btn">완료! 보상 받기!</button>
                  ) : (
                    <>
                      <div className="hw-progress-text">{c.progress}/{c.goal}</div>
                      <div className="hw-progress-bar">
                        <div className="hw-progress-fill" style={{ width: `${(c.progress / c.goal) * 100}%` }} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ---------------- RANKING PAGE ---------------- */}
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

            {/* 내 랭킹 */}
            {myRank && (
              <>
                <div className="my-info-box">
                  <div className="left-section">
                    <span className="rank">{myRank.rank}</span>
                    <div className="my-profile-img">
                      {myRank.profile_img ? (
                        <img src={myRank.profile_img} alt="my-profile" />
                      ) : (
                        <div className="img-placeholder" />
                      )}
                    </div>
                    <span className="nickname">{myRank.nickname}</span>
                  </div>

                  <span className="score">
                    <img src={medalIcon} className="medal-icon" />
                    {myRank.score}
                  </span>
                </div>

                <div className="my-info-bottom-bar"></div>

                <div className="fixed-bottom">
                  <MenuBar active="award" />
                </div>

                <div className="my-info-bottom-bar"></div>
              </>
            )}

          </div>
        </div>

      </div>

      <div className="fixed-bottom">
        <MenuBar active="award" />
      </div>

    </div>
  );
}