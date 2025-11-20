import React, { useState } from 'react'

const Calendar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState(8)
  const [currentMonth, setCurrentMonth] = useState({ year: 2025, month: 10 })

  // 달력 날짜 생성
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth.year, currentMonth.month)
  const firstDay = getFirstDayOfMonth(currentMonth.year, currentMonth.month)

  // 이전/다음 달로 이동
  const changeMonth = (direction) => {
    let newMonth = currentMonth.month + direction
    let newYear = currentMonth.year

    if (newMonth > 12) {
      newMonth = 1
      newYear++
    } else if (newMonth < 1) {
      newMonth = 12
      newYear--
    }

    setCurrentMonth({ year: newYear, month: newMonth })
  }

  // 특정 날짜에 기록이 있는지 (예시)
  const hasRecord = (day) => {
    return [3, 6, 8].includes(day) // 3일, 6일, 8일에 기록이 있다고 가정
  }

  return (
    <div>
      {/* 고정 헤더 */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'white',
        zIndex: 1000,
        borderBottom: '1px solid #e0e0e0',
      }}>
        <div style={{ position: 'relative', maxWidth: '100%', padding: '10px' }}>
          <span style={{ 
            position: 'absolute', 
            left: '25px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            🔍
          </span>
          <input 
            type="text" 
            placeholder="오늘은 어떤 음식을 드셨나요?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 50px 12px 45px',
              borderRadius: '25px',
              border: '1px solid #e0e0e0',
              fontSize: '14px',
              backgroundColor: '#f5f5f5',
            }}
          />
          <button 
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            📷
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 - 캘린더 */}
      <main style={{ 
        padding: '20px',
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}>
        {/* 캘린더 카드 */}
        <section style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}>
          {/* 월 선택 헤더 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '15px',
          }}>
            <button 
              onClick={() => changeMonth(-1)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ◀
            </button>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold',
              margin: 0,
            }}>
              {currentMonth.year}년 {currentMonth.month}월 ▼
            </h2>
            <button 
              onClick={() => changeMonth(1)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ▶
            </button>
          </div>

          {/* 요일 헤더 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px',
            marginBottom: '10px',
          }}>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <div key={day} style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: index === 0 ? '#FF6B9D' : index === 6 ? '#4FC3F7' : '#666',
                fontSize: '14px',
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px',
          }}>
            {/* 빈 칸 채우기 */}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {/* 날짜 */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isSelected = day === selectedDate
              const hasData = hasRecord(day)

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    background: isSelected ? '#4FC3F7' : hasData ? '#90EE90' : 'transparent',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: isSelected ? 'white' : '#333',
                    fontWeight: isSelected || hasData ? 'bold' : 'normal',
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </section>
        {/* 선택된 날짜 표시 */}
        <div style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '30px',
        }}>
          {currentMonth.year}.{String(currentMonth.month).padStart(2, '0')}.{String(selectedDate).padStart(2, '0')}
        </div>

        {/* 등록된 음식이 없을 때 */}
        <div style={{
          textAlign: 'center',
          color: '#666',
        }}>
          <p style={{ marginBottom: '20px' }}>등록한 음식이 없습니다.</p>
          <button style={{borderRadius: '100%', backgroundColor: '#AAAAAA', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '30px' }}>+</span>
            <span style={{ fontSize: '10px' }}>추가하기</span>
          </button>
        </div>
      </main>

      {/* 고정 푸터 */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '15px 0',
        zIndex: 1000,
      }}>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          📊
        </button>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#4FC3F7' }}>
          📆
        </button>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          🎖️
        </button>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          👤
        </button>
      </footer>
    </div>
  )
}

export default Calendar