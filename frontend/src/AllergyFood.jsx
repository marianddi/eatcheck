// AllergyFood.jsx
import React, { useState, useEffect } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

// 백엔드의 AllergyFood Enum 목록이라고 가정
const ALLERGY_OPTIONS = ["계란", "땅콩", "우유", "대두", "밀", "새우", "게", "돼지고기"];

export default function AllergyFood({ onBack }) {
    // 현재 선택된 알레르기 음식 (초기값은 API에서 가져와야 함)
    const [selectedFoods, setSelectedFoods] = useState(["땅콩", "계란"]);

    useEffect(() => {
        // 알레르기 음식 조회 API (GET /mypage/allergyFoods/{userPk})
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
            const payload = {
                userPk: 1,
                // 백엔드에서 Enum 문자열로 받도록 설계됨
                allergyFoods: selectedFoods.map(f => f.toUpperCase())
            };

            // API 호출: POST /mypage/allergyFoods
            // ... (API 호출 로직 생략) ...

            alert(`[더미 테스트] 알레르기 음식 변경 요청: ${selectedFoods.join(', ')}`);
            onBack();

        } catch (error) {
            alert("알레르기 음식 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="body-info-container">
            {/* 상단 헤더 */}
            <header className="bic-header">
                <button className="bic-back-btn" onClick={onBack}>
                    <img src={iconBack} alt="뒤로가기" />
                </button>
                <h1 className="bic-title">알레르기 음식 리스트</h1>
            </header>

            {/* 선택된 리스트 (시안의 위쪽 박스) */}
            <div className="info-box-wrapper" style={{ marginTop: '50px', padding: '15px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedFoods.map(food => (
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
                    ))}
                </div>
            </div>

            {/* 선택 가능한 전체 리스트 (시안의 아래쪽 박스 대신 간소화) */}
            <div className="info-box-wrapper" style={{ margin: '15px auto' }}>
                <h3 style={{ padding: '0 20px', fontSize: '16px', fontWeight: 'bold' }}>선택 가능한 알레르기 항목</h3>
                <div style={{ padding: '10px 20px', display: 'flex', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid #eee' }}>
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