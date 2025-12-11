// BodyInfoChange.jsx
import React, { useState, useEffect } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

// API 응답을 가정한 더미 데이터
const DUMMY_BODY_INFO = {
  age: 23,
  gender: "남",
  height: 175.0,
  weight: 72.0,
  activityLevelStr: "보통", // 주당 운동 시간 3-5회로 가정
  bmr: 1722,
};

export default function BodyInfoChange({ onBack }) {
  const [formData, setFormData] = useState(DUMMY_BODY_INFO);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 사용자 신체 정보 API 호출
  useEffect(() => {
    async function fetchBodyInfo() {
      // (API 호출 로직 생략)
        setFormData(DUMMY_BODY_INFO);
        setLoading(false);
    }
    fetchBodyInfo();
  }, []);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = (name === 'height' || name === 'weight' || name === 'bmr') ? Number(value) : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  // 저장 버튼 클릭 핸들러
  const handleSubmit = async () => {
    if (!formData.height || !formData.weight) {
      alert("키와 몸무게는 필수 입력값입니다.");
      return;
    }

    try {
      // API 호출: POST /mypage/changeBody
      // (API 호출 로직 생략)

      alert(`[더미 테스트] 변경 요청 데이터: 키 ${formData.height}cm, 몸무게 ${formData.weight}kg`);
      onBack && onBack();

    } catch (error) {
      alert("신체 조건 변경 중 통신 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div className="body-info-container">데이터 로딩 중...</div>;
  }

  const displayActivityText = formData.activityLevelStr;

  return (
    <div className="body-info-container">

      {/* 상단 헤더 */}
      <header className="bic-header">
        <button
            className="bic-back-btn"
            onClick={onBack}
        >
          <img src={iconBack} alt="뒤로가기" />
        </button>
        <h1 className="bic-title">신체 조건 변경</h1>
      </header>

      {/* 정보 입력 박스 */}
      <div className="info-box-wrapper">

        {/* 나이 (변경 불가 - 조회만) */}
        <div className="info-item">
          <span className="info-label">나이</span>
          <span className="info-value" style={{textAlign: 'right'}}>{formData.age}</span>
        </div>

        {/* 성별 (변경 불가 - 조회만) */}
        <div className="info-item">
          <span className="info-label">성별</span>
          <span className="info-value" style={{textAlign: 'right'}}>{formData.gender}</span>
        </div>

        {/* 키 (입력) */}
        <div className="info-item">
          <span className="info-label">키</span>
          <div className="input-with-unit">
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="000"
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
              value={formData.weight}
              onChange={handleChange}
              step="0.1"
              placeholder="00.0"
            />
            <span className="input-unit">kg</span>
          </div>
        </div>

        {/* 주당 운동 시간 (클릭 시 선택 팝업 필요) */}
        <div className="info-item">
          <span className="info-label">주당 운동 시간</span>
          <span
            className="info-value activity-level"
            style={{textAlign: 'right'}}
            onClick={() => alert("주당 운동 시간 선택 팝업/드롭다운 필요")}
          >
            {displayActivityText}
          </span>
        </div>

        {/* 기초대사량 (자동 계산 값 - 조회만) */}
        <div className="info-item">
          <span className="info-label">기초대사량</span>
          <span className="info-value" style={{textAlign: 'right'}}>{formData.bmr}</span>
        </div>

      </div>

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