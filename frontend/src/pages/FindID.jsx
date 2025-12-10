import React, { useState } from "react";
import axios from "axios";

const FindID = () => {
  const [email, setEmail] = useState("");

  const handleFindID = async () => {
    try {
      const res = await axios.get(`/auth/find-id?email=${email}`);
      window.location.href = `/found-id?id=${res.data.userId}`;
    } catch (err) {
      alert("아이디를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="find-container">
      <h2>아이디 찾기</h2>
      <input
        type="text"
        placeholder="가입한 이메일"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleFindID}>아이디 조회</button>
    </div>
  );
};

export default FindID;
