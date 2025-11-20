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
        <section className="greeting-section">
          <h2>홍길동님 오늘도 화이팅!</h2>
        </section>

        {/* 막대 그래프 섹션 */}
        <section className="chart-card">
          <h3>섭취량 비교</h3>
          <div style={{ 
            height: '250px', 
            background: '#f0f0f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            막대 차트 영역
          </div>
          
          {/* 진행률 바 */}
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="calorie-text">
              총 <span className="highlight">2920kcal</span> 중 
              <span className="highlight"> 2310kcal</span>를 섭취하셨습니다.
            </p>
          </div>
        </section>

        {/* 도넛 차트 섹션 */}
        <section className="chart-card">
          <h2 className="section-title">권장 영양소</h2>
          
          <div className="donut-wrapper">
            {/* 왼쪽: 영양소 목록 */}
            <ul className="nutrition-list">
              <li className="nutrition-item">
                <span className="color-dot blue"></span>
                <span>탄수화물 : 380g (63.5%)</span>
              </li>
              <li className="nutrition-item">
                <span className="color-dot orange"></span>
                <span>단백질 : 150g (23.8%)</span>
              </li>
              <li className="nutrition-item">
                <span className="color-dot pink"></span>
                <span>지방 : 80g (12.7%)</span>
              </li>
            </ul>

            {/* 오른쪽: 도넛 차트 */}
            <div className="donut-chart">
              <div style={{ 
                width: '200px', 
                height: '200px', 
                background: '#f0f0f0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                2820kcal
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 고정 푸터 */}
      <footer className="report-footer">
        <button className="footer-btn" onClick={ReportButton}><img src={Clipboard}/></button>
        <button className="footer-btn" onClick={CalendarButton}><img src={Calendar}/></button>
        <button className="footer-btn" onClick={RankingButton}><img src={Award}/></button>
        <button className="footer-btn" onClick={UserButton}><img src={User}/></button>
      </footer>
    </div>
  )
}

export default Report