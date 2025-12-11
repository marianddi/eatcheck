import React, { useState } from "react";
import api from "../api/axios";
import { login, getUserInfo } from "../api/user";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import logoImg from "../assets/img/eatcheck.png";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const loginRes = await login(userId, password);

    const userIdFromServer = loginRes.data.data; // ✅ userId

    // ✅ 최소 정보만 저장
    localStorage.setItem(
      "user",
      JSON.stringify({ userId: userIdFromServer })
    );

    navigate("/report");
  } catch (e) {
    console.error("로그인 실패", e);
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  }
};



  return (
    <div className="login-page">
      <img src={logoImg} alt="EatCheck Logo" className="login-logo" />
      <div className="login-box">-
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>

      <div className="login-links">
        <span onClick={() => navigate("/find-id")}>아이디 찾기</span> |
        <span onClick={() => navigate("/find-pw")}>비밀번호 찾기</span> |
        <span onClick={() => navigate("/signup")}>회원가입</span>
      </div>
    </div>
  );
};

export default Login;
