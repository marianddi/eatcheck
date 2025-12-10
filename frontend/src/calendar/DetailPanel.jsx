// src/calendar/DetailPanel.jsx
import React from "react";
import "./DetailPanel.css";

const DetailPanel = ({ date, logs }) => {
  const dateStr = date.toISOString().split("T")[0];

  // logs가 배열이 아닐 경우 대비
  const safeLogs = Array.isArray(logs) ? logs : [];

  return (
    <div className="detail-container">
      <h2>{dateStr} 기록</h2>

      {safeLogs.length === 0 ? (
        <div className="no-data">
          <p>기록이 없습니다.</p>
          <button className="add-button">추가하기</button>
        </div>
      ) : (
        <ul className="log-list">
          {safeLogs.map((log) => (
            <li key={log.logId} className="log-item">
              <div className="meal-type">{log.mealType}</div>
              <div className="food-name">{log.foodName}</div>
              <div className="cal">{log.calories} kcal</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DetailPanel;
