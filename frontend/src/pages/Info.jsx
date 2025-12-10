import React, { useState } from "react";
import api from "../api/axios";
import "../css/Info.css";

const Info = () => {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    activityLevel: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitProfile = async () => {
  alert("프로필 입력 완료 (임시 처리)");
  window.location.href = "/report";
};


  return (
    <>
      <div>
        <h2>저희는 식단을 도와드려요!</h2>
        <h3>아래의 정보를 입력해 주세요.</h3>
      </div>

      <div className="login-container">
        <div className="right-section">

          <input
            name="age"
            placeholder="나이"
            className="input-type"
            onChange={handleChange}
          />

          <input
            name="height"
            placeholder="키(cm)"
            className="input-type"
            onChange={handleChange}
          />

          <input
            name="weight"
            placeholder="몸무게(kg)"
            className="input-type"
            onChange={handleChange}
          />

          <select
            name="activityLevel"
            onChange={handleChange}
            className="input-type"
          >
            <option value="">활동량 선택</option>
            <option value="LOW">거의 안 움직임</option>
            <option value="LIGHT">가벼운 활동</option>
            <option value="MODERATE">보통 활동</option>
            <option value="ACTIVE">활발함</option>
            <option value="VERY_ACTIVE">매우 활동적</option>
          </select>

          <button onClick={submitProfile} className="login-button">
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default Info;
