import React from "react";
import { useSearchParams } from "react-router-dom";

const FoundPW = () => {
  const [params] = useSearchParams();
  const tempPw = params.get("tempPw");

  return (
    <div className="result-container">
      <h2>임시 비밀번호</h2>
      <p>{tempPw}</p>

      <button onClick={() => (window.location.href = "/login")}>
        로그인 하러가기
      </button>
    </div>
  );
};

export default FoundPW;
