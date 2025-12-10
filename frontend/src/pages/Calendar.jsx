import React from "react";

const Calendar = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📅 캘린더 화면</h2>
      <p>이곳에 식단 분석 캘린더가 들어갈 예정입니다.</p>
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

export default Calendar;
