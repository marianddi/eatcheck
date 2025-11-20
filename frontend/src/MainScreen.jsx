import React, { useState } from 'react';
import './css/MainScreen.css';
import Clipboard from './img/Clipboard.png'
import Calendar from './img/Calendar.png';
import Award from './img/Award.png';
import User from './img/User.png';

const MainScreen = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('추천순');
  
  const recentSearches = ['떡갈비', '라면', '불고기'];

  const searchResults = [
    { id: 1, name: '검색결과:고기', amount: '100g', calories: 287, percent: 8, favorite: false },
    { id: 2, name: '쇠고기', amount: '100g', calories: 230, percent: 5, favorite: false },
    { id: 3, name: '불고기', amount: '100g', calories: 250, percent: 7, favorite: false },
    { id: 4, name: '오리고기', amount: '100g', calories: 287, percent: 8, favorite: true },
    { id: 5, name: '고기전', amount: '100g', calories: 277, percent: 8, favorite: false },
    { id: 6, name: '고기 황반두', amount: '1개', calories: 80, percent: 3, favorite: false },
    { id: 7, name: '고기완자', amount: '100g', calories: 267, percent: 7, favorite: false },
    { id: 8, name: '콩고기', amount: '100g', calories: 187, percent: 5, favorite: false },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const filterOptions = [
    '추천순 ↑',
    '즐겨찾기 ↑',
    '칼로리 ↑',
    '칼로리 ↓',
    '탄수화물 ↑',
    '단백질 ↑',
    '지방 ↑'
  ];

  const handleSearch = (query) => {
    setSearchText(query);
    setSearchFocused(false);
    setShowSearchResults(true);
  };

  const toggleFavorite = (id) => {
    // 즐겨찾기 토글 로직
  };

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 필터 모달
  if (showFilterModal) {
    return (
      <div className="modal-overlay">
        <div className="filter-modal">
          <div className="filter-options">
            {filterOptions.map((option, index) => (
              <div
                key={index}
                className="filter-option"
                onClick={() => {
                  setSelectedFilter(option);
                  setShowFilterModal(false);
                }}
              >
                <span>{option}</span>
                <div className={`radio-button ${selectedFilter === option ? 'selected' : ''}`}>
                  {selectedFilter === option && <div className="radio-inner"></div>}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowFilterModal(false)}
            className="filter-close-btn"
          >
            🎚️
          </button>
        </div>
      </div>
    );
  }

  // 검색 결과 화면
  if (showSearchResults) {
    return (
      <div className="container">
        <div className="header">
          <div className="search-bar">
            <span className="icon">🔍</span>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className="icon">📷</span>
          </div>
        </div>

        <div className="result-header">
          <span className="result-title">검색결과:{searchText}</span>
          <button onClick={() => setShowFilterModal(true)} className="sort-btn">
            <span>정렬</span>
            <span>⚙️</span>
          </button>
        </div>

        <div className="result-list">
          {searchResults.map((item) => (
            <div key={item.id} className="result-item">
              <div className="item-info">
                <div className="item-title">
                  <h3>{item.name}</h3>
                  <span className="item-amount">{item.amount}</span>
                </div>
                <p className="item-detail">
                  일일 권장 {item.percent}% - {item.calories}kcal
                </p>
              </div>
              
              <div className="item-actions">
                <button onClick={() => toggleFavorite(item.id)} className="favorite-btn">
                  {item.favorite ? '⭐' : '☆'}
                </button>
                <button 
                  onClick={() => toggleSelectItem(item.id)}
                  className={`checkbox ${selectedItems.includes(item.id) ? 'checked' : ''}`}
                >
                  {selectedItems.includes(item.id) && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="filter-button-container">
          <button onClick={() => setShowFilterModal(true)} className="filter-btn">
            🎚️
          </button>
        </div>

        <div className="bottom-nav">
          <div className="nav-item active">
            <img src="Clipboard.png" alt="Clipboard" />
            <div className="nav-indicator"></div>
          </div>
          <img src="Calendar.png" alt="Calendar" className="nav-icon" />
          <img src="Award.png" alt="Award" className="nav-icon" />
          <img src="User.png" alt="User" className="nav-icon" />
        </div>
      </div>
    );
  }

  // 최근 검색 화면
  if (searchFocused) {
    return (
      <div className="container">
        <div className="header">
          <div className="search-bar">
            <span className="icon">🔍</span>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchText.trim()) {
                  handleSearch(searchText);
                }
              }}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              autoFocus
            />
            <span className="icon">📷</span>
          </div>
        </div>

        <div className="recent-searches">
          {recentSearches.map((item, index) => (
            <div
              key={index}
              className="recent-item"
              onClick={() => handleSearch(item)}
            >
              <span className="icon">🕐</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="filter-button-container">
          <button onClick={() => setShowFilterModal(true)} className="filter-btn">
            🎚️
          </button>
        </div>

        <div className="bottom-nav">
          <div className="nav-item active">
            <img src="Clipboard.png" alt="Clipboard" />
            <div className="nav-indicator"></div>
          </div>
          <img src="Calendar.png" alt="Calendar" className="nav-icon" />
          <img src="Award.png" alt="Award" className="nav-icon" />
          <img src="User.png" alt="User" className="nav-icon" />
        </div>
      </div>
    );
  }

  // 메인 화면
  return (
    <div className="container">
      <div className="header">
        <div className="search-bar clickable" onClick={() => setSearchFocused(true)}>
          <span className="icon">🔍</span>
          <div className="search-placeholder">오늘은 어떤 음식을 드셨나요?</div>
          <span className="icon">📷</span>
        </div>
      </div>

      <div className="main-content">
        <div className="card">
          <h2 className="card-title">홍길동님 오늘도 화이팅!</h2>
          
          <div className="legend">
            <div className="legend-item">
              <div className="legend-box gray"></div>
              <span>권장량</span>
            </div>
            <div className="legend-item">
              <div className="legend-box cyan"></div>
              <span>섭취량</span>
            </div>
          </div>

          <div className="bar-chart">
            <div className="bar-group">
              <div className="bars">
                <div className="bar gray" style={{ height: '80px' }}></div>
                <div className="bar cyan" style={{ height: '80px' }}></div>
              </div>
              <span className="bar-label">탄수화물</span>
            </div>
            <div className="bar-group">
              <div className="bars">
                <div className="bar gray" style={{ height: '50px' }}></div>
                <div className="bar cyan" style={{ height: '40px' }}></div>
              </div>
              <span className="bar-label">단백질</span>
            </div>
            <div className="bar-group">
              <div className="bars">
                <div className="bar gray" style={{ height: '40px' }}></div>
                <div className="bar cyan" style={{ height: '35px' }}></div>
              </div>
              <span className="bar-label">지방</span>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="calorie-text">
            총 <span className="highlight">2920kcal</span> 중 <span className="highlight">2310kcal</span>를 섭취하였습니다.
          </div>
        </div>

        <div className="card">
          <h2 className="card-title-large">권장 영양소</h2>
          
          <div className="nutrition-content">
            <div className="nutrition-legend">
              <div className="nutrition-item">
                <div className="dot cyan"></div>
                <span>탄수화물 : 380g (63.5%)</span>
              </div>
              <div className="nutrition-item">
                <div className="dot yellow"></div>
                <span>단백질 : 150g (23.8%)</span>
              </div>
              <div className="nutrition-item">
                <div className="dot pink"></div>
                <span>지방 : 80g (12.7%)</span>
              </div>
            </div>

            <div className="donut-chart">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#22D3EE" strokeWidth="20"
                  strokeDasharray="159 251" strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#FBBF24" strokeWidth="20"
                  strokeDasharray="60 251" strokeDashoffset="-159"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#F472B6" strokeWidth="20"
                  strokeDasharray="32 251" strokeDashoffset="-219"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="donut-center">2820kcal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-nav">
        <div className="nav-item active">
          <img src={Clipboard} alt="Clipboard" />
          <div className="nav-indicator"></div>
        </div>
        <img src={Calendar} alt="Calendar" className="nav-icon" />
        <img src={Award} alt="Award" className="nav-icon" />
        <img src={User} alt="User" className="nav-icon" />
      </div>
    </div>
  );
};

export default MainScreen;