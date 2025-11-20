import React, { useState } from 'react'
import './css/report.css'
import Clipboard from './img/Clipboard.png'
import Calendar from './img/Calendar.png';
import Award from './img/Award.png';
import User from './img/User.png';
import ReportButton from './Report'
import CalendarButton from './Calendar';
//import RankingButton from './Ranking';
//import UserButton from './User';

const Report = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="report-container">
      {/* 고정 헤더 */}
      <header className="report-header">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="오늘은 어떤 음식을 드셨나요?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="camera-btn">📷</button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="report-main">
        
      </main>

      {/* 고정 푸터 */}
      <footer className="report-footer">
        <button className="footer-btn" onClick={ReportButton}><img src={Clipboard}/></button>
        <button className="footer-btn" onClick={CalendarButton}><img src={Calendar}/></button>
        <button className="footer-btn"><img src={Award}/></button>
        <button className="footer-btn"><img src={User}/></button>
      </footer>
    </div>
  )
}

export default Report;