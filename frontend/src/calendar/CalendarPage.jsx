import React, { useEffect, useState } from "react";
import CalendarView from "./CalendarView"; // ★ 변경
import DetailPanel from "./DetailPanel";
import api from "../api/api";
import "./CalendarPage.css";
import MenuBar from "../MenuBar";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState([]);

    const userId = 1;

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const loadLogs = async (dateObj) => {
        const date = formatDate(dateObj);
        try {
            const res = await api.get("/log/daily", { params: { userId, date } });
            if (Array.isArray(res.data)) setLogs(res.data);
            else setLogs([]);
        } catch (e) {
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
        <div>
            <div className="calendar-container">
                <div className="calendar-left">
                    <CalendarView selectedDate={selectedDate} onDayClick={onDateChange} />
                </div>
                <div className="calendar-right">
                    <DetailPanel date={selectedDate} logs={logs} />
                </div>
            </div>

            <div className="menu-bar-wrapper">
                <MenuBar active="calendar" />
            </div>
            
        </div>
        
    );
};

export default CalendarPage;
