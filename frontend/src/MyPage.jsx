// MyPage.jsx (useNavigate를 사용하여 화면 이동)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 useNavigate 훅 사용
import Header from "./components/Header";
import BottomNav from "./components/BottomNav"; 
import "./MyPage.css";
// MenuBar와 iconUser는 BottomNav와 Header로 대체되거나 사용되지 않아 주석 처리합니다.
// import MenuBar from "./MenuBar"; 
// import iconUser from "./assets/User.png"; 
// import searchIcon from "./assets/search.png";
import cameraIcon from "./assets/Camera.png"; 

// --- 상수 (API 연동 가정) ---
const USER_PK = 1; 
const BASE_URL = "http://localhost:8080";

const INITIAL_USER_DATA = {
    nickname: "로딩 중...",
    profileImage: null,
    currentWeight: 0.0,
    weeklyChange: 0,
    logs: [],
};

// navigateTo prop을 받지 않고, useNavigate 훅을 사용합니다.
export default function MyPage() { 
    const [userData, setUserData] = useState(INITIAL_USER_DATA);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // 👈 useNavigate 훅 사용

    // ⭐ 페이지 이름과 실제 라우팅 경로를 매핑하는 함수
    const getPath = (pageName) => {
        switch (pageName) {
            case '신체 조건 변경': return '/body-info-change';
            case '비밀번호 변경': return '/password-change';
            case '목표 변경': return '/goal-change';
            case '알레르기 음식 리스트': return '/allergy-food';
            case '닉네임 수정': return '/nickname-change';
            default: return '/user';
        }
    };
    
    // ⭐ 메뉴 이동을 처리하는 함수
    const handleNavigation = (pageName) => {
        const path = getPath(pageName);
        console.log(`[MyPage] Navigating to: ${path}`);
        navigate(path);
    };


    // API 호출: 마이페이지 정보 조회 (GET /mypage/userInfo/{userPk})
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${BASE_URL}/mypage/userInfo/${USER_PK}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const json = await response.json();
                
                if (json.status === "OK" && json.data) {
                    const data = json.data;
                    
                    const fetchedLogs = data.weightLogs || [];
                    const sortedLogs = fetchedLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
                    
                    const currentWeight = sortedLogs.length > 0 
                        ? parseFloat(sortedLogs[sortedLogs.length - 1].weight) 
                        : parseFloat(data.currentWeight) || 0.0;
                    
                    setUserData({
                        nickname: data.nickname || "사용자",
                        profileImage: data.profileImage || null,
                        currentWeight: currentWeight,
                        weeklyChange: data.weeklyChange || 0,
                        logs: sortedLogs,
                    });

                } else {
                    alert(`마이페이지 정보 조회 실패: ${json.message || '알 수 없는 오류'}`);
                    setUserData(INITIAL_USER_DATA);
                }
            } catch (err) {
                console.error("마이페이지 정보 로드 실패:", err);
                alert("마이페이지 정보를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.");
                setUserData(INITIAL_USER_DATA);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);


    if (loading) {
        return <div className="mypage-container">데이터를 불러오는 중...</div>;
    }
    
    // --- 그래프 데이터 준비 ---
    const logs = userData.logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = ["6주 전", "4주 전", "2주 전", "이번 주"];
    
    // 최근 4개의 로그를 사용
    const graphLogs = logs.slice(-4);

    const graphData = labels.map((label, index) => {
        const log = graphLogs[graphLogs.length - (labels.length - index)];
        const weight = log ? parseFloat(log.weight) : userData.currentWeight;
        return {
            label: label, 
            weight: weight,
        };
    });
    
    // 시안에 표시된 최대/최소값 계산 (로그 기반으로 동적 계산)
    const allWeights = logs.map(log => parseFloat(log.weight));
    const calculatedMax = Math.max(...allWeights, userData.currentWeight);
    const calculatedMin = Math.min(...allWeights, userData.currentWeight);

    // 그래프 표시를 위한 범위 설정 (최소/최대에서 1kg 여백)
    const maxWeight = calculatedMax > calculatedMin ? calculatedMax + 1 : 72.0; 
    const minWeight = calculatedMin > 0 ? calculatedMin - 1 : 68.0; 
    const range = maxWeight - minWeight;


    return (
        <div className="mypage-container">

            {/* 1. 상단 검색바 -> Header 컴포넌트 사용 */}
            <Header /> 
            
            {/* 중앙 콘텐츠 스크롤 영역 래퍼 */}
            <div className="content-scroll-area"> 
            
                {/* 2, 4, 5. 프로필, 닉네임, 몸무게 정보 */}
                <section className="user-profile-wrapper">
                    
                    {/* 1. 프로필 이미지 */}
                    <div className="profile-img-container">
                        {userData.profileImage ? (
                            <img src={userData.profileImage} alt="프로필 이미지" />
                        ) : (
                            <div className="img-placeholder" /> 
                        )}
                    </div>
                    
                    {/* 2, 3. 닉네임 및 수정 버튼 */}
                    <div className="nickname-box">
                        <span className="nickname-text">{userData.nickname}</span> 
                        <button
                            className="nickname-edit-btn"
                            onClick={() => handleNavigation("닉네임 수정")} // 👈 변경
                        >
                            &#x270E;
                        </button>
                    </div>

                    {/* 💡 4, 5. 몸무게 및 수정 버튼 (닉네임 아래에 중앙 정렬) */}
                    <div className="current-weight-display-box"> 
                        <div className="current-weight-display">
                            {userData.currentWeight.toFixed(1)}<span>kg</span>
                        </div>
                        {/* 연필 아이콘 (신체 조건 변경으로 이동) */}
                        <button
                            className="nickname-edit-btn"
                            onClick={() => handleNavigation("신체 조건 변경")} // 👈 변경
                        >
                            &#x270E;
                        </button>
                    </div>
                </section>

                {/* 6. 몸무게 그래프 섹션 (중앙 넓은 박스) */}
                <section className="weight-graph-section">
                    <div className="graph-wrapper">
                        {/* Y축 (최대/최소 체중) */}
                        <div className="weight-axis">
                            <span className="weight-label top">{maxWeight.toFixed(1)}kg</span>
                            <span className="weight-label middle-high">{(maxWeight - range / 2).toFixed(1)}kg</span> 
                            <span className="weight-label bottom">{minWeight.toFixed(1)}kg</span>
                        </div >
                        
                        {/* X축 및 데이터 포인트 */}
                        <div className="time-axis">
                            <svg className="graph-line" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polyline
                                    fill="none"
                                    stroke="#FFD54F" // 노란색
                                    strokeWidth="2"
                                    points={graphData.map((data, index) => {
                                        const x = (index * 25) + 12.5; 
                                        const y = 100 - ((data.weight - minWeight) / range * 100);
                                        return `${x},${y}`;
                                    }).join(' ')}
                                />
                            </svg>

                            {/* 데이터 포인트 */}
                            {graphData.map((data, index) => (
                                        <div key={index} className="graph-point-container">
                                            <div className="data-point" 
                                                style={{ bottom: `${(data.weight - minWeight) / range * 100}%` }}
                                            />
                                        </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* X축 레이블 (6주 전, 4주 전, 2주 전, 이번 주) */}
                    <div className="graph-x-labels-wrapper">
                        {graphData.map((data, index) => (
                                 <span key={index} className={`graph-x-label ${data.label === '이번 주' ? 'active' : ''}`}>
                                     {data.label}
                                 </span>
                        ))}
                    </div>

                    <p className="graph-notice">
                        * 몸무게는 일주일마다 갱신이 필요합니다.
                    </p>
                </section>


                {/* 7, 8. 메뉴 리스트 및 로그아웃 */}
                <section className="menu-list-section-new">
                    
                    {/* 신체 조건 변경 */}
                    <div className="menu-item-new" onClick={() => handleNavigation("신체 조건 변경")}>
                        <span className="menu-icon">ⓘ</span>
                        <span className="menu-item-text">신체 조건 변경</span>
                        <span className="menu-item-arrow">›</span>
                    </div>

                    {/* 비밀번호 변경 */}
                    <div className="menu-item-new" onClick={() => handleNavigation("비밀번호 변경")}>
                        <span className="menu-icon">&#x2699;</span>
                        <span className="menu-item-text">비밀번호 변경</span>
                        <span className="menu-item-arrow">›</span>
                    </div>

                    {/* 목표 변경 */}
                    <div className="menu-item-new" onClick={() => handleNavigation("목표 변경")}>
                        <span className="menu-icon">&#x1F4C5;</span>
                        <span className="menu-item-text">목표 변경</span>
                        <span className="menu-item-arrow">›</span>
                    </div>

                    {/* 알레르기 음식 수정 */}
                    <div className="menu-item-new" onClick={() => handleNavigation("알레르기 음식 리스트")}>
                        <span className="menu-icon">⚠</span>
                        <span className="menu-item-text">알레르기 음식 수정</span>
                        <span className="menu-item-arrow">›</span>
                    </div>
                    
                    {/* 로그아웃 (시안 반영) */}
                    <div className="menu-item-new logout-item" onClick={() => alert("로그아웃 되었습니다.")}>
                            <span className="menu-icon">→</span> 
                            <span className="menu-item-text">로그아웃</span>
                    </div>

                </section>

            </div>
            {/* 중앙 콘텐츠 스크롤 영역 끝 */}

            {/* 하단 메뉴 바 -> BottomNav 컴포넌트 사용 */}
            <BottomNav />
        </div>
    );
}