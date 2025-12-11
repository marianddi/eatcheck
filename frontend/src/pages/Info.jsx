import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { Decimal } from 'decimal.js';
import api from "../api/axios"; // api.js 파일 임포트 확인
import "../css/Info.css"; // CSS 파일 경로는 필요에 따라 수정하세요.
import "../css/Info.css";

const Info = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // 사용자 ID 저장

  // 캡처 이미지에 있는 모든 필드를 상태로 관리
  const [form, setForm] = useState({
    age: "", // 나이
    height: "", // 키(cm)
    weight: "", // 몸무게(현재)
    targetWeight: "", // 목표 체중
    targetDurationDays: "", // 달성 기간 (D-day) - 날짜 필드로 가정
    basalMetabolicRate: "", // 기초대사량 (BMR)
    activityLevel: "",
  });

  // 폼 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 1. 컴포넌트 마운트 시 사용자 ID 확인
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      setUserId(user.userId);
    } else {
      // 사용자 ID가 없으면 로그인 페이지로 리다이렉트
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 2. 프로필 제출 핸들러
  const submitProfile = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    if (!userId) {
      alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해 주세요.");
      return;
    }

    // 필수 입력 필드 검증 (예시)
    if (
      !form.age ||
      !form.height ||
      !form.weight ||
      !form.targetWeight ||
      form.activityLevel === "" ||
      form.targetDurationDays === ""
    ) {
      alert("모든 필수 정보를 입력해 주세요.");
      return;
    }

    const profileData = {
        userId: parseInt(userId), 
        age: parseInt(form.age),
        
        // 💡 height, weight, targetWeight는 toFixed(2)를 사용하여 문자열로 전송
        height: new Decimal(form.height).toFixed(2), // 예: "170.00"
        weight: new Decimal(form.weight).toFixed(2),  // 예: "88.00"
        targetWeight: new Decimal(form.targetWeight).toFixed(2), // 예: "77.00"
        
        activityLevel: form.activityLevel,
        targetDurationDays: parseInt(form.targetDurationDays),
    };

    console.log("전송할 프로필 데이터:", profileData);
    
    try {
      // 백엔드 프로필 설정 API 경로로 POST 요청
      // 백엔드의 경로가 POST /profile/set이라고 가정
      const res = await api.post("/profile/set", profileData); 

      if (res.status === 200 || res.status === 201) {
        alert("프로필 정보가 성공적으로 저장되었습니다!");
        navigate("/report");
      } else {
        // 백엔드에서 200/201 외의 상태 코드를 보낼 경우
        alert("프로필 저장에 실패했습니다: " + (res.data.message || "알 수 없는 오류"));
      }

    } catch (e) {
      console.error("프로필 제출 실패:", e);
      alert("프로필 저장 중 오류가 발생했습니다. 모든 필드를 올바르게 입력했는지 확인해주세요.");
    }
  };


  return (
    <div className="info-page">
      <div className="info-header">
        <h2>저희는 식단을 도와드려요!</h2>
        <h3>아래의 정보를 입력해 주세요.</h3>
      </div>

      <form onSubmit={submitProfile} className="info-form-container">
        
        {/* 1. 나이 */}
        <div className="input-group">
          <label className="input-label">나이</label>
          <input
            type="number"
            name="age"
            placeholder="" /* placeholder 제거 */
            className="input-field"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* 1-B. 성별 추가 (이미지에 있으므로 상태에 성별 필드 추가 필요) */}
        <div className="input-group">
            <label className="input-label">성별</label>
            {/* 💡 form 상태에 'gender' 필드를 추가하고, 아래 코드를 사용하세요. */}
            <select
                name="gender" 
                value={form.gender || ''} /* form 상태에 gender 필드 추가 필요 */
                onChange={handleChange}
                className="input-field select-field"
                required
            >
                <option value="" disabled>선택</option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
            </select>
        </div>
        
        {/* 2. 키(cm) */}
        <div className="input-group">
          <label className="input-label">키(cm)</label>
          <input
            type="number"
            name="height"
            placeholder=""
            className="input-field"
            value={form.height}
            onChange={handleChange}
            required
          />
        </div>

        {/* 3. 몸무게(현재) */}
        <div className="input-group">
          <label className="input-label">몸무게</label>
          <input
            type="number"
            name="weight"
            placeholder=""
            className="input-field"
            value={form.weight}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* 4. 목표 체중 */}
        <div className="input-group">
          <label className="input-label">목표 체중</label>
          <input
            type="number"
            name="targetWeight"
            placeholder=""
            className="input-field"
            value={form.targetWeight}
            onChange={handleChange}
            required
          />
        </div>

        {/* 5. 목표 달성 기간 (D-day) */}
        <div className="input-group">
          <label className="input-label">달성 기간(D-day)</label>
          <input
            type="number"
            name="targetDurationDays" 
            placeholder=""
            className="input-field"
            value={form.targetDurationDays}
            onChange={handleChange}
            required
          />
        </div>

        {/* 6. 기초대사량 (BMR) - 읽기 전용 */}
        {/* DTO에는 없었지만 이미지에는 있으므로 구조만 유지, 읽기 전용으로 설정 */}
        <div className="input-group read-only">
          <label className="input-label">기초대사량</label>
          <input
            type="number"
            name="basalMetabolicRate"
            placeholder=""
            className="input-field"
            value={form.basalMetabolicRate}
            readOnly={true}
          />
        </div>


        {/* 7. 활동 레벨 (주당 운동 시간) - DTO 필드명은 activityLevel */}
        <div className="input-group">
          <label className="input-label">주당 운동 시간</label>
          <select
            name="activityLevel"
            value={form.activityLevel}
            onChange={handleChange}
            className="input-field select-field"
            required
          >
            <option value="">선택</option>
            <option value="LOW">활동량이 거의 없음 (주당 1회 이하)</option>
            <option value="LIGHT">가벼운 활동 (주당 1~3회)</option>
            <option value="MODERATE">보통 활동 (주당 3~5회)</option>
            <option value="ACTIVE">활발한 활동 (주당 6~7회)</option>
            <option value="VERY_ACTIVE">매우 활발한 활동 (매일 2회 이상)</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          확인
        </button>
      </form>
    </div>
  );
};

export default Info;