// src/calendar/CalendarPage.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import DetailPanel from "./DetailPanel";
import api from "../api/api"; // ★ axios baseURL 적용
import "./CalendarPage.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState([]);

  const userId = 1; // 임시로 고정 (백엔드 연동시 수정 가능)

  // 날짜를 YYYY-MM-DD 로 변환
  // 기존: const formatDate = (date) => date.toISOString().split("T")[0];
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 01~12
  const day = String(date.getDate()).padStart(2, "0");        // 일 01~31
  return `${year}-${month}-${day}`;
};

  const loadLogs = async (dateObj) => {
    const date = formatDate(dateObj);

    try {
      const res = await api.get("/log/daily", {
        params: { userId, date },
      });

      console.log("🔥 API 응답 JSON:", res.data);

      if (Array.isArray(res.data)) {
        setLogs(res.data);
      } else {
        console.warn("⚠ 배열 형태가 아님:", res.data);
        setLogs([]);
      }
    } catch (e) {
      console.error("❌ API 요청 실패:", e);
      setLogs([]);
    }
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    loadLogs(date);
  };

  useEffect(() => {
    loadLogs(selectedDate);
  }, []);

  return (
    <div className="calendar-container">
      <div className="calendar-left">
        <Calendar onChange={onDateChange} value={selectedDate} />
      </div>

      <div className="calendar-right">
        <DetailPanel date={selectedDate} logs={logs} />
      </div>
    </div>
  );
};

export default CalendarPage;
