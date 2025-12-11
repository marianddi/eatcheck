// GoalChange.jsx (오류 수정 및 API 연동 최종본)
import React, { useState, useEffect } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

// --- 상수 설정 ---
const BASE_URL = "http://localhost:8080"; 
const USER_PK = 1; 

// API 응답 구조를 위한 초기값
const INITIAL_GOAL = { targetWeight: 0.0, days: 0 };

export default function GoalChange({ onBack }) {
    // goalWeight는 BigDecimal에 대응하기 위해 문자열로 관리
    const [goalWeight, setGoalWeight] = useState(INITIAL_GOAL.targetWeight.toString());
    const [days, setDays] = useState(INITIAL_GOAL.days.toString());
    const [loading, setLoading] = useState(true);

    // 목표 데이터 조회 API (GET /mypage/goalData/{userPk})
    useEffect(() => {
        const fetchGoalData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/mypage/goalData/${USER_PK}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const json = await response.json();
                
                // 응답 구조: status: "OK" 확인 및 data 필드 사용
                if (json.status === "OK" && json.data) {
                    const data = json.data;
                    
                    // 필드명: goalWeight/targetWeight, days/targetDurationDays 중 백엔드 DTO에 맞는 필드를 사용
                    setGoalWeight((data.goalWeight || data.targetWeight || 0.0).toString()); 
                    setDays((data.days || data.targetDurationDays || 0).toString()); 
                } else {
                    alert(`목표 조회 실패: ${json.message || '알 수 없는 오류'}`);
                }
            } catch (error) {
                console.error("목표 데이터 조회 오류:", error);
                alert("목표 데이터를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.");
            } finally {
                setLoading(false);
            }
        };

        fetchGoalData();
    }, []);


    const handleSubmit = async () => {
        // 입력 값을 숫자로 변환하고 유효성 검사
        const finalGoalWeight = parseFloat(goalWeight);
        const finalDays = parseInt(days);
        
        if (isNaN(finalGoalWeight) || finalGoalWeight <= 0 || isNaN(finalDays) || finalDays <= 0) {
            alert("목표 몸무게와 목표 기간을 정확히 입력해주세요.");
            return;
        }

        try {
            // DTO 구조 (GoalRequest)에 맞게 페이로드 구성
            const payload = {
                userPk: USER_PK,
                // 백엔드 BigDecimal 타입에 맞게 toFixed(2)로 전송
                goalWeight: finalGoalWeight.toFixed(2), 
                days: finalDays,
            };

            // API 호출: POST /mypage/changeGoal
            const response = await fetch(`${BASE_URL}/mypage/changeGoal`, {
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

            // 저장 성공 조건도 status: "OK"로 가정
            if (json.status === "OK") { 
                alert("목표가 성공적으로 변경되었습니다.");
                
                // 💡 에러 방지 코드 추가: onBack이 함수인지 확인 후 호출
                if (typeof onBack === 'function') {
                    onBack(); 
                } else {
                    console.error("onBack prop이 함수가 아닙니다. 라우팅을 실행할 수 없습니다.");
                }
                
            } else {
                alert(`목표 변경 실패: ${json.message || '알 수 없는 오류'}`);
            }

        } catch (error) {
            console.error("목표 변경 중 오류:", error);
            alert("목표 변경 중 통신 오류가 발생했습니다.");
        }
    };
    
    if (loading) {
        return <div className="body-info-container">데이터 로딩 중...</div>;
    }


    return (
        <div className="body-info-container">
            {/* 상단 헤더 */}
            <header className="bic-header">
                {/* onBack props가 함수일 때만 호출되도록 변경함 (안정성 강화) */}
                <button className="bic-back-btn" onClick={onBack}>
                    <img src={iconBack} alt="뒤로가기" />
                </button>
                <h1 className="bic-title">목표 변경</h1>
            </header>

            {/* 정보 입력 박스 */}
            <div className="info-box-wrapper" style={{ marginTop: '50px' }}>

                <div className="info-item">
                    <span className="info-label">목표 체중</span>
                    <div className="input-field-wrapper">
                        <div className="input-with-unit">
                            <input
                                type="number"
                                value={goalWeight}
                                onChange={(e) => setGoalWeight(e.target.value)}
                                step="0.1"
                                placeholder="00.0"
                            />
                            <span className="input-unit">kg</span>
                        </div>
                    </div>
                </div>

                <div className="info-item">
                    <span className="info-label">목표 기간</span>
                    <div className="input-field-wrapper">
                        <div className="input-with-unit">
                            <input
                                type="number"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                placeholder="00"
                            />
                            <span className="input-unit">일</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 저장 버튼 영역 */}
            <div className="bottom-fixed-area">
                <p className="bic-notice">
                    * 목표 달성을 위한 권장 칼로리는 변경된 목표에 맞춰 서버에서 자동 재계산됩니다.
                </p>
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