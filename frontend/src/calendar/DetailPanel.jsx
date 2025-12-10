// src/calendar/DetailPanel.jsx
import React from "react";
import "./DetailPanel.css";

const DetailPanel = ({ date, logs }) => {
    const dateStr = date.toISOString().split("T")[0];

    // logs가 배열이 아닐 경우 대비
    const safeLogs = Array.isArray(logs) ? logs : [];

    // 총합 계산
    const totalCalories = safeLogs.reduce((sum, log) => sum + log.calories, 0);
    const totalCarb = safeLogs.reduce((sum, log) => sum + log.carb, 0);
    const totalProtein = safeLogs.reduce((sum, log) => sum + log.protein, 0);
    const totalFat = safeLogs.reduce((sum, log) => sum + log.fat, 0);

    // 음식 이름 나열
    const foodNames = safeLogs.map((log) => log.foodName).join(", ");

    return (
        <div className="detail-container">
            <h2>{dateStr} 기록</h2>

            {safeLogs.length === 0 ? (
                <div className="no-data">
                    <p>기록이 없습니다.</p>
                    <button className="add-button">추가하기</button>
                </div>
            ) : (
                <div className="summary">
                    <p><strong>섭취 칼로리:</strong> {totalCalories} kcal</p>
                    <p><strong>섭취 음식</strong></p>
                    <ul className="food-list">
                        {safeLogs.map((log, index) => (
                            <li key={index}>{log.foodName}</li>
                        ))}
                    </ul>

                    <p><strong>섭취 영양소</strong></p>
                    <ul className="nutrition-list">
                        <li>탄수화물 : {totalCarb}g</li>
                        <li>단백질 : {totalProtein}g</li>
                        <li>지방 : {totalFat}g</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DetailPanel;
