import React from "react";

const UserPage = () => {
  const nickname = localStorage.getItem("nickname") || "사용자";

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 마이페이지</h2>
      <p>{nickname} 님, 환영합니다!</p>
      <p>이곳에서 사용자 정보 수정 / 기록 확인 기능이 추가될 예정입니다.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
};

export default UserPage;
