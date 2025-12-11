// AllergyFood.jsx (API 연동 최종본)
import React, { useState, useEffect } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

// --- 상수 설정 ---
const BASE_URL = "http://localhost:8080"; 
const USER_PK = 1; 

// 백엔드의 AllergyFood Enum 목록 및 한글 매핑
// Enum Key는 대문자 영문, Description은 한글로 가정 (User.java 엔티티의 Enum 필드와 일치)
const ALLERGY_MAP = {
    "EGG": "계란", "PEANUT": "땅콩", "MILK": "우유", "SOY": "대두", 
    "WHEAT": "밀", "SHRIMP": "새우", "CRAB": "게", "PORK": "돼지고기"
};
// 화면에 표시할 한글 목록
const ALLERGY_OPTIONS = Object.values(ALLERGY_MAP); 
// Enum Key -> 한글 (조회 시 사용)
const KEY_TO_KR = ALLERGY_MAP;
// 한글 -> Enum Key (저장 시 사용)
const KR_TO_KEY = Object.fromEntries(
    Object.entries(ALLERGY_MAP).map(([key, value]) => [value, key])
);


export default function AllergyFood({ onBack }) {
    // 현재 선택된 알레르기 음식 (한글 목록)
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // 알레르기 음식 조회 API (GET /mypage/allergyFoods/{userPk})
    useEffect(() => {
        const fetchAllergyFoods = async () => {
            try {
                const response = await fetch(`${BASE_URL}/mypage/allergyFoods/${USER_PK}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const json = await response.json();
                
                // 응답 구조: status: "OK" 확인 및 data 필드 사용
                if (json.status === "OK" && json.data && Array.isArray(json.data)) {
                    // 백엔드에서 받은 Enum Key 목록 (예: ["EGG", "PEANUT"])을 한글로 변환
                    const koreanFoods = json.data
                        .map(key => KEY_TO_KR[key] || key) // Key를 한글로 변환, 없으면 Key 그대로 사용
                        .filter(food => ALLERGY_OPTIONS.includes(food)); // 유효한 항목만 필터링
                        
                    setSelectedFoods(koreanFoods);
                } else {
                    // 실패 시 빈 배열로 초기화하고 메시지 표시
                    setSelectedFoods([]);
                    alert(`알레르기 조회 실패: ${json.message || '알 수 없는 오류'}`);
                }
            } catch (error) {
                console.error("알레르기 조회 오류:", error);
                alert("알레르기 정보를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllergyFoods();
    }, []);

    // 알레르기 항목 클릭 핸들러 (추가/제거 토글)
    const handleToggle = (food) => {
        setSelectedFoods(prev => {
            if (prev.includes(food)) {
                return prev.filter(f => f !== food); // 제거
            } else {
                return [...prev, food]; // 추가
            }
        });
    };

    const handleRemove = (foodToRemove) => {
        setSelectedFoods(prev => prev.filter(f => f !== foodToRemove));
    };


    const handleSubmit = async () => {
        try {
            // 한글 목록을 백엔드 Enum Key 목록으로 변환 (예: ["계란"] -> ["EGG"])
            // KR_TO_KEY에 없는 값은 대문자 처리하여 fallback으로 전송
            const allergyKeys = selectedFoods.map(food => KR_TO_KEY[food] || food.toUpperCase());

            // AllergyFoodRequest DTO 구조에 맞는 페이로드
            const payload = {
                userPk: USER_PK,
                allergyFoods: allergyKeys
            };

            // API 호출: POST /mypage/allergyFoods
            const response = await fetch(`${BASE_URL}/mypage/allergyFoods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            
            if (json.status === "OK") { 
                alert("알레르기 음식이 성공적으로 변경되었습니다.");
                
                // onBack 안전성 검사
                if (typeof onBack === 'function') {
                    onBack(); 
                } else {
                    console.error("onBack prop이 함수가 아닙니다. 라우팅을 실행할 수 없습니다.");
                }
                
            } else {
                alert(`알레르기 변경 실패: ${json.message || '알 수 없는 오류'}`);
            }

        } catch (error) {
            console.error("알레르기 음식 변경 중 오류:", error);
            alert("알레르기 음식 변경 중 통신 오류가 발생했습니다.");
        }
    };
    
    if (loading) {
        return <div className="body-info-container">데이터 로딩 중...</div>;
    }


    return (
        <div className="body-info-container">
            {/* 상단 헤더 */}
            <header className="bic-header">
                <button className="bic-back-btn" onClick={onBack}>
                    <img src={iconBack} alt="뒤로가기" />
                </button>
                <h1 className="bic-title">알레르기 음식 리스트</h1>
            </header>

            {/* 선택된 리스트 (상단 박스) */}
            <div className="info-box-wrapper" style={{ marginTop: '50px', padding: '15px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedFoods.length === 0 ? (
                        <p style={{ color: '#888', margin: '0' }}>현재 선택된 알레르기 항목이 없습니다.</p>
                    ) : (
                        selectedFoods.map(food => (
                            <div key={food} style={{
                                padding: '8px 12px',
                                background: '#e0f7fa', // 하늘색 계열 배경
                                borderRadius: '15px',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                cursor: 'pointer'
                            }}>
                                {food}
                                <span
                                    onClick={() => handleRemove(food)}
                                    style={{ fontWeight: 'normal', color: '#00bcd4' }}
                                >
                                    X
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 선택 가능한 전체 리스트 (하단 박스) */}
            <div className="info-box-wrapper" style={{ margin: '15px auto' }}>
                <h3 style={{ padding: '15px 20px 0', fontSize: '16px', fontWeight: 'bold' }}>선택 가능한 알레르기 항목</h3>
                <div style={{ padding: '10px 20px 20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {ALLERGY_OPTIONS.map(food => (
                        <button
                            key={food}
                            onClick={() => handleToggle(food)}
                            style={{
                                padding: '8px 15px',
                                background: selectedFoods.includes(food) ? '#4DB3CF' : '#f0f0f0',
                                color: selectedFoods.includes(food) ? 'white' : '#333',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            {food}
                        </button>
                    ))}
                </div>
            </div>

            <p className="bic-notice" style={{ width: '90%', margin: '0 auto 10px' }}>
                * 추가된 음식은 영양 성분 검색 시 제외하도록 기능을 제공합니다.
            </p>

            {/* 저장 버튼 영역 */}
            <div className="bottom-fixed-area">
                <button
                    className="bic-save-btn"
                    onClick={handleSubmit}
                >
                    저장 하기
                </button>
            </div>
        </div>
    );
}