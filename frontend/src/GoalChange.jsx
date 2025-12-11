// GoalChange.jsx
import React, { useState, useEffect } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

const DUMMY_GOAL = { targetWeight: 65.0, days: 30 };

export default function GoalChange({ onBack }) {
    const [goalWeight, setGoalWeight] = useState(DUMMY_GOAL.targetWeight);
    const [days, setDays] = useState(DUMMY_GOAL.days);

    useEffect(() => {
        // 목표 데이터 조회 API (GET /mypage/goalData/{userPk})
        // 현재는 더미 데이터로 대체
    }, []);

    const handleSubmit = async () => {
        if (!goalWeight || !days) {
            alert("목표 몸무게와 목표 기간을 입력해주세요.");
            return;
        }

        try {
            const payload = {
                userPk: 1, // 실제 유저 PK
                goalWeight: goalWeight,
                days: days
            };

            // API 호출: POST /mypage/changeGoal
            // ... (API 호출 로직 생략) ...

            alert(`[더미 테스트] 목표 몸무게 ${goalWeight}kg, 기간 ${days}일로 변경 요청.`);
            onBack();

        } catch (error) {
            alert("목표 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="body-info-container">
            {/* 상단 헤더 */}
            <header className="bic-header">
                <button className="bic-back-btn" onClick={onBack}>
                    <img src={iconBack} alt="뒤로가기" />
                </button>
                <h1 className="bic-title">목표 변경</h1>
            </header>

            {/* 정보 입력 박스 */}
            <div className="info-box-wrapper" style={{ marginTop: '50px' }}>

                <div className="info-item">
                    <span className="info-label">목표 체중</span>
                    <div className="input-with-unit">
                        <input
                            type="number"
                            value={goalWeight}
                            onChange={(e) => setGoalWeight(Number(e.target.value))}
                            step="0.1"
                        />
                        <span className="input-unit">kg</span>
                    </div>
                </div>

                <div className="info-item">
                    <span className="info-label">목표 기간</span>
                    <div className="input-with-unit">
                        <input
                            type="number"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                        />
                        <span className="input-unit">일</span>
                    </div>
                </div>

            </div>

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