import React, { useEffect, useState } from "react";
import "./RankingPage.css";
import MenuBar from "./MenuBar";
import cameraIcon from "./assets/Camera.png";
import medalIcon from "./assets/medal.png";
import searchIcon from "./assets/search.png";
import SearchBar from "./SearchBar";
import backIcon from "./assets/back.png"

export default function RankingPage() {
  const [top10, setTop10] = useState([]);
  const [myRank, setMyRank] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [top10Res, myRankRes] = await Promise.all([
          fetch("/api/ranking/top10"),
          fetch("/api/ranking/me"),
        ]);
        const top10Data = await top10Res.json();
        const myData = await myRankRes.json();
        setTop10(top10Data);
        setMyRank(myData);
      } catch (err) {
        console.error("API 오류:", err);

        const dummyTop10 = Array.from({ length: 10 }, (_, i) => ({
          user_id: i + 1,
          nickname: `더미사용자 ${i + 1}`,
          score: 30 - i,
          rank: i + 1,
          profile_img: null,
        }));

        setTop10(dummyTop10);
        setMyRank({
          user_id: 999,
          nickname: "나(더미)",
          score: 10,
          rank: 15,
          profile_img: null,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="ranking-container">

      {/* 검색 바 */}
      <SearchBar/>

      {/* 🔥 여기서부터 스크롤 영역 */}
      <div className="rank-scroll-area">

        {/* 랭킹 제목 */}
       <div className="ranking-header">
   <img
    src={backIcon}
    className="back-icon"
    alt="back"
    onClick={() => navigate("/homework")}
  />

  <h1 className="ranking-title">랭 킹</h1>
</div>

        {/* Top 3 podium */}
        {top10.length >= 3 && (
          <div className="podium-wrapper">

            <div className="podium-item">
  <div className="profile-circle" />

  <span className="nickname">{top10[1].nickname}</span>

  <div className="top3-score">
    <img src={medalIcon} alt="medal" className="medal-icon" />
    <span>{top10[1].score}</span>
  </div>

  <div className="bar second" />
</div>

            <div className="podium-item">
  <div className="profile-circle" />

  <span className="nickname">{top10[0].nickname}</span>

  <div className="top3-score">
    <img src={medalIcon} alt="medal" className="medal-icon" />
    <span>{top10[0].score}</span>
  </div>

  <div className="bar first" />
</div>

            <div className="podium-item">
  <div className="profile-circle" />

  <span className="nickname">{top10[2].nickname}</span>

  <div className="top3-score">
    <img src={medalIcon} alt="medal" className="medal-icon" />
    <span>{top10[2].score}</span>
  </div>

  <div className="bar third" />
</div>
          </div>
        )}

        {/* podium bottom bar */}
        <div className="podium-bottom-bar"></div>

        {/* 4등부터 리스트 */}
        <ul className="rank-list">
          {top10.slice(3).map((user) => (
            <li className="rank-item" key={user.user_id}>
              <span>{user.rank}</span>
              <div className="rank-user-img">
                {user.profile_img ? (
                  <img src={user.profile_img} alt={user.nickname} />
                ) : (
                  <div className="img-placeholder" />
                )}
              </div>
              <span className="rank-username">{user.nickname}</span>
              <span className="rank-score">
  
  <img src={medalIcon} alt="medal" className="medal-icon" />{user.score}
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
          {myRank.profile_img ? (
            <img src={myRank.profile_img} alt="my-profile" />
          ) : (
            <div className="img-placeholder" />
          )}
        </div>

        <span className="nickname">{myRank.nickname}</span>
      </div>

      <span className="score">
        <img src={medalIcon} alt="medal" className="medal-icon" />
        {myRank.score}
      </span>
    </div>

    <div className="my-info-bottom-bar"></div>
  </>
)}


<div className="my-info-divider"></div>

      <MenuBar active="award" />
    </div>
  );
}
