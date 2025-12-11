import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/menuBar.css";

import iconAward from "./assets/Award.png";
import iconCalendar from "./assets/Calendar.png";
import iconClipboard from "./assets/Clipboard.png";
import iconUser from "./assets/User.png";

export default function MenuBar({ active }) {
  const navigate = useNavigate();

  return (
    <nav className="menu-bar">
      
      <button
        className={`menu-btn ${active === "clipboard" ? "active" : ""}`}
        onClick={() => navigate("/report")}
      >
        <img src={iconClipboard} alt="clipboard" />
        <div className="menu-underline"></div>
      </button>

      <button
        className={`menu-btn ${active === "calendar" ? "active" : ""}`}
        onClick={() => navigate("/calendar")}
      >
        <img src={iconCalendar} alt="calendar" />
        <div className="menu-underline"></div>
      </button>

      <button
        className={`menu-btn ${active === "award" ? "active" : ""}`}
        onClick={() => navigate("/ranking")}
      >
        <img src={iconAward} alt="award" />
        <div className="menu-underline"></div>
      </button>

      <button
        className={`menu-btn ${active === "user" ? "active" : ""}`}
        onClick={() => navigate("/user")}
      >
        <img src={iconUser} alt="user" />
        <div className="menu-underline"></div>
      </button>
    
    </nav>
  );
}
