// src/SearchBar.jsx
import React from "react";
import "./SearchBar.css";

import searchIcon from "./assets/search.png";
import cameraIcon from "./assets/camera.png";

export default function SearchBar() {
  return (
    <header className="search-area">
      <div className="search-box">
        <img src={searchIcon} className="search-icon" alt="search" />

        <input
          type="text"
          placeholder="오늘은 어떤 음식을 드셨나요?"
        />

        <img src={cameraIcon} className="camera-icon" alt="camera" />
      </div>
    </header>
  );
}
