import React, { useState } from "react";
import api from "../api/axios";
//import "../css/SignUp.css";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await api.post("/signup/register", {
        userId,
        nickname,
        email,
        password,
      });

      if (res.data.status === "OK") {
        alert("회원가입 완료!");
        window.location.href = "/login";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>

      <input placeholder="아이디" onChange={(e) => setUserId(e.target.value)} />
      <input placeholder="닉네임" onChange={(e) => setNickname(e.target.value)} />
      <input placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setPassword2(e.target.value)}
      />

      <button onClick={handleSignup}>가입하기</button>
    </div>
  );
};

export default SignUp;
