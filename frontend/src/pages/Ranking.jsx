import React from "react";

const Ranking = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 랭킹 화면</h2>
      <p>여기에 운동/식단 관련 랭킹 데이터가 들어갈 예정입니다.</p>
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

export default Ranking;
