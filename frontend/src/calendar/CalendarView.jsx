import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";

export default function CalendarView({ selectedDate, onDayClick }) {
  return (
    <div className="calendar-wrapper">
      <Calendar
        onClickDay={onDayClick}
        value={selectedDate}
        formatDay={(locale, date) => date.getDate()} // 01 → 1
      />
    </div>
  );
}
