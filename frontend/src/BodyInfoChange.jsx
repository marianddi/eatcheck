// BodyInfoChange.jsx (제공된 응답 구조 반영 최종 수정)
import React, { useState, useEffect } from "react";
import "./BodyInfoChange.css"; 
import iconBack from "./assets/back.png";

// --- 상수 설정 ---
const BASE_URL = "http://localhost:8080"; 
const USER_PK = 1; 

// Gender Enum 매핑
const GENDER_MAPPING = {
    "MALE": "남",
    "FEMALE": "여",
    "OTHER": "기타",
};

// ActivityLevel Enum에 기반한 데이터 구조
const ACTIVITY_LEVELS = [
    { key: "LEVEL_1", description: "숨쉬기 운동 (1시간 이하)" },
    { key: "LEVEL_2", description: "가벼운 활동 (1~3시간)" },
    { key: "LEVEL_3", description: "중등도 활동 (3~5시간)" },
    { key: "LEVEL_4", description: "활발한 활동 (5~7시간)" },
    { key: "LEVEL_5", description: "매우 활발 (7~9시간)" },
    { key: "LEVEL_6", description: "격렬한 활동 (9시간 이상)" }
];

// ActivityLevel Key <-> Description 변환 유틸리티
const mapKeyToDescription = (key) => {
    const level = ACTIVITY_LEVELS.find(level => level.key === key);
    return level ? level.description : key;
};
const mapDescriptionToKey = (description) => {
    const level = ACTIVITY_LEVELS.find(level => level.description === description);
    return level ? level.key : description;
};


// API 응답을 가정한 초기 빈 데이터
const INITIAL_BODY_INFO = {
  age: 0,
  gender: "",
  height: 0.0,
  weight: 0.0,
  activityLevelStr: ACTIVITY_LEVELS[0].description, 
  bmr: 0,
};

export default function BodyInfoChange({ onBack }) {
  const [formData, setFormData] = useState(INITIAL_BODY_INFO);
  const [loading, setLoading] = useState(true);
  const [isSelectingActivityLevel, setIsSelectingActivityLevel] = useState(false);

  // 컴포넌트 마운트 시 사용자 신체 정보 조회 (GET 연동)
  useEffect(() => {
    const fetchBodyInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/mypage/bodyInfo/${USER_PK}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        // 🚨 1. 성공 조건 변경: status: "OK"와 data 필드 존재 여부 확인
        if (json.status === "OK" && json.data) {
            const data = json.data;
            
            // 🚨 2. ActivityLevel 필드 변경: data.activityLevel 사용
            let activityKey = data.activityLevel; 
            let activityStr = mapKeyToDescription(activityKey);

            setFormData({
                age: data.age || 0,
                gender: GENDER_MAPPING[data.gender] || data.gender || "", 
                // 💡 data.height, data.weight는 숫자로 오므로 직접 사용 (toString()은 아래 입력 필드에서 처리)
                height: data.height || 0.0, 
                weight: data.weight || 0.0,
                activityLevelStr: activityStr,
                bmr: data.bmr || 0,
            });
        } else {
            // 실패 메시지 처리 (message 필드 사용)
            setFormData(INITIAL_BODY_INFO);
            alert(`신체 정보 조회 실패: ${json.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error("신체 정보 조회 오류:", error);
        alert("신체 정보를 불러오는 데 실패했습니다. 서버/CORS 설정을 확인해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchBodyInfo();
  }, []);

  // 입력 필드 변경 핸들러 (키, 몸무게)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 입력 값은 소수점 처리를 위해 문자열 그대로 받습니다.
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 주당 운동 시간 선택 핸들러
  const handleActivityLevelSelect = (description) => {
    setFormData(prev => ({
        ...prev,
        activityLevelStr: description
    }));
    setIsSelectingActivityLevel(false); 
  }

  // 저장 버튼 클릭 핸들러 (POST 연동)
  const handleSubmit = async () => {
    // 저장 전, 문자열로 되어있는 키/몸무게를 숫자로 변환하고 유효성 검사
    const finalHeight = parseFloat(formData.height);
    const finalWeight = parseFloat(formData.weight);
    
    if (isNaN(finalHeight) || finalHeight <= 0 || isNaN(finalWeight) || finalWeight <= 0) {
      alert("키와 몸무게를 정확히 입력해주세요.");
      return;
    }
    
    // API 전송 시, Enum Key (LEVEL_1 등)를 전송
    const activityLevelKey = mapDescriptionToKey(formData.activityLevelStr);

    // DTO 구조 (SetBodyInfoRequest)에 맞게 페이로드 구성
    const payload = {
        userPk: USER_PK,
        // 💡 백엔드 BigDecimal 타입에 맞게 toFixed(2)로 전송 (엔티티를 따름)
        height: finalHeight.toFixed(2), 
        weight: finalWeight.toFixed(2), 
        bmr: formData.bmr, 
        activityLevelStr: activityLevelKey, 
    };
    
    try {
        const response = await fetch(`${BASE_URL}/mypage/changeBody`, {
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
        
        // 🚨 저장 성공 조건도 status: "OK"로 가정
        if (json.status === "OK") { 
            alert("신체 조건이 성공적으로 변경되었습니다.");
            onBack && onBack(); 
        } else {
            alert(`변경 실패: ${json.message || '알 수 없는 오류'}`);
        }
    } catch (error) {
        console.error("신체 조건 변경 오류:", error);
        alert("신체 조건 변경 중 통신 오류가 발생했습니다. 서버 상태를 확인해주세요.");
    }
  };

  if (loading) {
    return <div className="body-info-container">데이터 로딩 중...</div>;
  }

  const displayActivityText = formData.activityLevelStr || "선택 필요";


  return (
    <div className="body-info-container">

      {/* 상단 헤더 */}
      <header className="bic-header">
        <button className="bic-back-btn" onClick={onBack}>
          <img src={iconBack} alt="뒤로가기" />
        </button>
        <h1 className="bic-title">신체 조건 변경</h1>
      </header>
      
      {/* 배경 오버레이 */}
      {isSelectingActivityLevel && (
        <div 
            className="selection-overlay" 
            onClick={() => setIsSelectingActivityLevel(false)}
        />
      )}

      {/* 정보 입력 박스 */}
      <div className="info-box-wrapper" style={{marginTop: '50px'}}>

        {/* 나이 (조회만) */}
        <div className="info-item read-only">
          <span className="info-label">나이</span>
          <span className="info-value">{formData.age || '-'} 세</span>
        </div>

        {/* 성별 (조회만) */}
        <div className="info-item read-only">
          <span className="info-label">성별</span>
          <span className="info-value">{formData.gender || '-'}</span>
        </div>

        {/* 키 (입력) */}
        <div className="info-item">
          <span className="info-label">키</span>
          <div className="input-with-unit">
            <input
              type="number"
              name="height"
              // 💡 값 바인딩 시 숫자를 문자열로 변환하여 입력
              value={formData.height.toString()} 
              onChange={handleChange}
              placeholder="000.0"
            />
            <span className="input-unit">cm</span>
          </div>
        </div>

        {/* 몸무게 (입력) */}
        <div className="info-item">
          <span className="info-label">몸무게</span>
          <div className="input-with-unit">
            <input
              type="number"
              name="weight"
              value={formData.weight.toString()}
              onChange={handleChange}
              step="0.1"
              placeholder="00.0"
            />
            <span className="input-unit">kg</span>
          </div>
        </div>

        {/* 주당 운동 시간 (선택) */}
        <div 
          className="info-item clickable"
          onClick={() => setIsSelectingActivityLevel(prev => !prev)}
        >
          <span className="info-label">주당 운동 시간</span>
          <div className="input-with-unit" style={{justifyContent: 'flex-end'}}>
             <span className="info-value">{displayActivityText}</span>
             <span className="menu-item-arrow">›</span>
          </div>
        </div>

        {/* 기초대사량 (조회만) */}
        <div className="info-item read-only">
          <span className="info-label">기초대사량</span>
          <span className="info-value">{formData.bmr || '-'} kcal</span>
        </div>

      </div>
      
      {/* 주당 운동 시간 선택 목록 */}
      {isSelectingActivityLevel && (
        <div className="activity-level-select-box">
            <h3 className="select-title">주당 운동 시간 선택</h3>
            {ACTIVITY_LEVELS.map((level) => (
                <div 
                    key={level.key}
                    className={`select-option-item ${formData.activityLevelStr === level.description ? 'selected' : ''}`}
                    onClick={() => handleActivityLevelSelect(level.description)}
                >
                    {level.description}
                    {formData.activityLevelStr === level.description && (
                         <span className="selected-check">✔</span>
                    )}
                </div>
            ))}
        </div>
      )}


      {/* 저장 버튼 영역 */}
      <div className="bottom-fixed-area">
        <p className="bic-notice">
            * 기초대사량 및 권장 칼로리는 변경된 신체조건에 맞춰 서버에서 자동 재계산됩니다.
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