import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import api from "../api/axios";
import "../css/Signup.css";

const SignUp = () => {
  const navigate = useNavigate(); // ✅ 추가

  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const handleSignup = async (e) => {
    e?.preventDefault();
    // ✅ 성별 체크
    if (!gender) {
      alert("성별을 선택해주세요.");
      return;
    }

    // ✅ 비밀번호 일치 체크
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const data = {
      userId,
      nickname,
      email,
      password,
      gender, // MALE / FEMALE
    };

    console.log("signup payload:", data);

    try {
      await api.post("/signUp/register", data);
      alert("회원가입 완료!");

      // ✅ SPA 방식 페이지 이동 (404 안 남)
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else if (err.response?.status === 400) {
        alert("입력값을 다시 확인해주세요.");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>

      <input
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <input
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">성별 선택</option>
        <option value="MALE">남성</option>
        <option value="FEMALE">여성</option>
      </select>

      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <button type="button" onClick={handleSignup}>가입하기</button>
    </div>
  );
};

export default SignUp;
