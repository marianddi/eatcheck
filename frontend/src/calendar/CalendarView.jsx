import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";

export default function CalendarView({ selectedDate, onDayClick }) {
  const koreanWeekdays = ["일","월","화","수","목","금","토"];

  // 상단 년/월 한글로 렌더링
  const formatMonthYear = (locale, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={onDayClick}
        value={selectedDate}
        locale="en-US"  // locale은 기본, 요일과 상단은 직접 커스터마이징
        formatDay={(locale, date) => date.getDate()}  // 숫자만 표시
        formatShortWeekday={(locale, date) => koreanWeekdays[date.getDay()]} // 일~토
        formatMonthYear={formatMonthYear} // 상단 년/월 한글
      />
    </div>
  );
}
