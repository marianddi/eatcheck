import React, { useState } from "react";
import axios from "axios";

const FindPW = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const handleFindPW = async () => {
    try {
      const res = await axios.post("/auth/find-password", {
        userId,
        email,
      });

      window.location.href = `/found-pw?tempPw=${res.data.tempPassword}`;
    } catch (err) {
      alert("정보가 일치하지 않습니다.");
    }
  };

  return (
    <div className="find-container">
      <h2>비밀번호 찾기</h2>

      <input placeholder="아이디" onChange={(e) => setUserId(e.target.value)} />
      <input placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />

      <button onClick={handleFindPW}>임시 비밀번호 받기</button>
    </div>
  );
};

export default FindPW;
