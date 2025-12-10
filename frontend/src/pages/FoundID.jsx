import React from "react";
import { useSearchParams } from "react-router-dom";

const FoundID = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <div className="result-container">
      <h2>조회된 아이디</h2>
      <p>{id}</p>

      <button onClick={() => (window.location.href = "/login")}>
        로그인 하러가기
      </button>
    </div>
  );
};

export default FoundID;
