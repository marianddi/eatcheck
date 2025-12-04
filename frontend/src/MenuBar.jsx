import React from "react";
import "./MenuBar.css";

import iconAward from "./assets/Award.png";
import iconCalendar from "./assets/Calendar.png";
import iconClipboard from "./assets/Clipboard.png";
import iconUser from "./assets/User.png";

export default function MenuBar({ active }) {
  return (
    <nav className="menu-bar">
      
      <button className={`menu-btn ${active === "clipboard" ? "active" : ""}`}>
        <img src={iconClipboard} alt="clipboard" />
        <div className="menu-underline"></div>
      </button>

      <button className={`menu-btn ${active === "calendar" ? "active" : ""}`}>
        <img src={iconCalendar} alt="calendar" />
        <div className="menu-underline"></div>
      </button>

      <button className={`menu-btn ${active === "award" ? "active" : ""}`}>
        <img src={iconAward} alt="award" />
        <div className="menu-underline"></div>
      </button>

      <button className={`menu-btn ${active === "user" ? "active" : ""}`}>
        <img src={iconUser} alt="user" />
        <div className="menu-underline"></div>
      </button>
    
    </nav>
  );
}
