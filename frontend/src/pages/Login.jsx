import React, { useState } from "react";
import api from "../api/axios";
import { login, getUserInfo } from "../api/user";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import logoImg from "../assets/eatcheck.png";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    // 1. [외부 try] 로그인 시도
    const loginRes = await login(userId, password);

    console.log("로그인 API 응답 전체:", loginRes.data);
    console.log("로그인 API 데이터 객체:", loginRes.data.data);

    const loginData = loginRes.data.data;

    // 최소 정보 저장
    localStorage.setItem(
      "user",
      JSON.stringify({ userId: loginData.userPk, 
                       nickname: loginData.nickname })
    );

    // 2. [내부 try] 프로필 정보 존재 여부 확인 API 호출
    try {
      // ✅ 추가된 코드: GET /profile/{userId} 호출 시도
      await api.get(`/profile/${loginData.userPk}`);
      
      // 3. 프로필 정보가 있으면 (성공) -> Report 페이지로 이동
      console.log("프로필 정보 확인 완료. Report 페이지로 리다이렉트.");
      navigate("/report");

    } catch (profileError) {
      // 4. [내부 catch] 프로필 정보가 없으면 (서버에서 404 및 특정 메시지를 받은 경우)
      
      const errorMessage = profileError.response?.data?.message || profileError.response?.data; // 서버 응답 메시지 추출 (메시지 위치 확인 후 수정)

      if (
        profileError.response &&
        profileError.response.status === 404 &&
        errorMessage === "프로필을 찾을 수 없습니다. 프로필 설정이 필요합니다."
      ) {
        console.log("프로필 정보 부족. Info 페이지로 리다이렉트.");
        navigate("/report"); // 💡 Info.jsx 페이지의 경로로 이동
      } else {
        // 프로필 확인 중 예기치 않은 오류 (e.g., 서버 500 오류 등)
        console.error("프로필 확인 중 예기치 않은 오류 발생:", profileError);
        alert("프로필 정보 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        navigate("/login"); // 오류 발생 시 안전하게 로그인 페이지로 돌려보냅니다.
      }
    }

  } catch (e) {
    // 5. [외부 catch] 로그인 자체가 실패한 경우 (아이디/비밀번호 오류 등)
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
