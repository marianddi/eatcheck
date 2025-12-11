// MyPage.jsx
import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import "./MyPage.css";
// 아이콘 경로는 실제 파일 위치에 맞게 수정해주세요.
import iconUser from "./assets/User.png";
import iconBack from "./assets/back.png";
import iconLine from "./assets/Line 1.png";

const DUMMY_USER_DATA = {
  nickname: "UserNickname",
  profileImg: null,
  currentWeight: 75.5,
  weeklyChange: -0.8,
  weightLogs: [],
};

// navigateTo 함수를 props로 받습니다.
export default function MyPage({ navigateTo }) {
  const [userData, setUserData] = useState(DUMMY_USER_DATA);
  const [loading, setLoading] = useState(true);

  // (API 로직 생략)
  useEffect(() => {
    // UI 테스트를 위해 API 호출 없이 바로 렌더링
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="mypage-container">데이터를 불러오는 중...</div>;
  }

  const weeklyChangeAbs = Math.abs(userData.weeklyChange);
  const changeText = userData.weeklyChange < 0
    ? `${weeklyChangeAbs.toFixed(1)} kg 감소`
    : (userData.weeklyChange > 0 ? `${weeklyChangeAbs.toFixed(1)} kg 증가` : `변화 없음`);
  const changeClass = userData.weeklyChange < 0 ? 'loss' : (userData.weeklyChange > 0 ? 'gain' : 'no-change');
  const iconTransform = userData.weeklyChange < 0
    ? 'rotate(-90deg)'
    : (userData.weeklyChange > 0 ? 'rotate(90deg)' : 'none');

  return (
    <div className="mypage-container">

      {/* 1. 상단 헤더 (뒤로가기 + 제목) */}
      <header className="mypage-header">
        <button
            className="mypage-header-back-btn"
            onClick={() => alert("앱 메인으로 이동")} // 뒤로가기는 앱 메인으로 가정
        >
          <img src={iconBack} alt="뒤로가기" />
        </button>
        <h1 className="mypage-header-title">마이페이지</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      {/* 2. 사용자 프로필 섹션 */}
      <section className="profile-section">
        <div className="profile-img-container">
          {userData.profileImg ? (
             <img src={userData.profileImg} alt="프로필 이미지" />
          ) : (
             <img src={iconUser} alt="기본 프로필" style={{ width: '60%', height: '60%', opacity: 0.5 }} />
          )}
        </div>
        <div className="profile-info">
          <span className="nickname">{userData.nickname}</span>
        </div>
        <button
            className="profile-edit-btn"
            onClick={() => navigateTo("닉네임 수정")}
        >
            수정
        </button>
      </section>

      {/* 3. 몸무게 정보 섹션 */}
      <section className="weight-info-section">
        <div className="weight-current">현재 몸무게</div>
        <div className="weight-value">
          {userData.currentWeight.toFixed(1)}<span>kg</span>
        </div>

        <div className={`weekly-change ${changeClass}`}>
            <img
                src={iconLine}
                alt="변화 아이콘"
                style={{ width: '18px', height: '18px', transform: iconTransform }}
            />
            {changeText}
        </div>

        <div className="weight-graph-placeholder">
          주간 몸무게 변화 그래프
        </div>
      </section>

      {/* 4. 메뉴 리스트 섹션 */}
      <section className="menu-list-section">
        <div
            className="menu-item"
            onClick={() => navigateTo("신체 조건 변경")}
        >
          <span className="menu-item-text">신체 조건 변경</span>
          <span className="menu-item-arrow">›</span>
        </div>
        <div
            className="menu-item"
            onClick={() => navigateTo("목표 변경")}
        >
          <span className="menu-item-text">목표 변경</span>
          <span className="menu-item-arrow">›</span>
        </div>
        <div
            className="menu-item"
            onClick={() => navigateTo("알레르기 음식 리스트")}
        >
          <span className="menu-item-text">알레르기 음식 리스트</span>
          <span className="menu-item-arrow">›</span>
        </div>
        <div
            className="menu-item"
            onClick={() => navigateTo("비밀번호 변경")}
        >
          <span className="menu-item-text">비밀번호 변경</span>
          <span className="menu-item-arrow">›</span>
        </div>
      </section>

      {/* 5. 로그아웃 버튼 */}
      <section className="logout-section">
        <button
            className="logout-btn"
            onClick={() => alert("로그아웃 되었습니다.")}
        >
            로그아웃
        </button>
      </section>

      {/* 6. 하단 메뉴 바 - 'user'가 활성화되도록 설정 */}
      <MenuBar active="user" />

    </div>
  );
}