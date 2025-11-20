import React, { useState } from 'react';
<script src="https://cdn.tailwindcss.com"></script>

const EatCheckApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 8)); // 2025년 10월 8일
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempYear, setTempYear] = useState(2025);
  const [tempMonth, setTempMonth] = useState(10);

  // 날짜별 식단 데이터
  const mealData = {
    '2025-10-06': {
      calories: 2320,
      foods: ['샐러드', '돈까스', '닭가슴살'],
      carbs: 4.7,
      protein: 31.6,
      fat: 43.4
    },
    '2025-10-08': {
      calories: 0,
      foods: [],
      carbs: 0,
      protein: 0,
      fat: 0
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentMonthData = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      setSelectedDate(newDate);
    }
  };

  const handleDatePickerConfirm = () => {
    setSelectedDate(new Date(tempYear, tempMonth - 1, selectedDate.getDate()));
    setShowDatePicker(false);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           selectedDate.getMonth() === today.getMonth() && 
           selectedDate.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (day) => {
    return day === selectedDate.getDate();
  };

  // 로그인 화면
  const LoginScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="inline-block bg-white rounded-full p-6 shadow-lg mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🍅</span>
            <span className="text-4xl">🥦</span>
            <span className="text-4xl">🧀</span>
            <span className="text-4xl">📋</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Eat Check!</h1>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <div className="bg-gray-200 rounded-full px-6 py-4 flex items-center">
          <input 
            type="text" 
            placeholder="아이디" 
            className="bg-transparent flex-1 outline-none text-gray-700"
          />
          <span className="text-gray-500">👤</span>
        </div>
        
        <div className="bg-gray-200 rounded-full px-6 py-4 flex items-center">
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="bg-transparent flex-1 outline-none text-gray-700"
          />
          <span className="text-gray-500">🔒</span>
        </div>
        
        <button 
          onClick={() => setCurrentScreen('main')}
          className="w-full bg-gray-300 hover:bg-gray-400 rounded-full px-6 py-4 font-medium text-gray-700"
        >
          로그인
        </button>
        
        <div className="text-center text-sm text-gray-600 pt-2">
          아이디 찾기 | 비밀번호 찾기 | 회원가입
        </div>
      </div>
    </div>
  );

  // 메인 화면
  const MainScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm mb-4 flex items-center gap-2 p-3">
          <span className="text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="오늘은 어떤 음식을 드셨나요?" 
            className="flex-1 outline-none text-gray-600"
          />
          <span className="text-gray-400">📷</span>
        </div>

        <h2 className="text-xl font-bold text-center mb-4">홍길동님 오늘도 화이팅!</h2>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-4">
          <div className="flex justify-around mb-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">권장량</div>
              <div className="flex gap-4">
                <div>
                  <div className="h-32 w-12 bg-gray-300 rounded relative">
                    <div className="absolute bottom-0 w-full bg-gray-500 rounded" style={{height: '30%'}}></div>
                  </div>
                  <div className="text-xs text-center mt-2">탄수화물</div>
                </div>
                <div>
                  <div className="h-32 w-12 bg-gray-300 rounded relative">
                    <div className="absolute bottom-0 w-full bg-gray-500 rounded" style={{height: '60%'}}></div>
                  </div>
                  <div className="text-xs text-center mt-2">단백질</div>
                </div>
                <div>
                  <div className="h-32 w-12 bg-gray-300 rounded relative">
                    <div className="absolute bottom-0 w-full bg-gray-500 rounded" style={{height: '40%'}}></div>
                  </div>
                  <div className="text-xs text-center mt-2">지방</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-2">섭취량</div>
              <div className="flex gap-4">
                <div>
                  <div className="h-32 w-12 bg-gray-300 rounded relative">
                    <div className="absolute bottom-0 w-full bg-cyan-400 rounded" style={{height: '25%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="h-32 w-12 bg-gray-300 rounded relative">
                    <div className="absolute bottom-0 w-full bg-cyan-400 rounded" style={{height: '50%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="h-32 w-12 bg-gray-300 rounded relative">
                    <div className="absolute bottom-0 w-full bg-cyan-400 rounded" style={{height: '35%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-8 bg-gray-300 rounded-full overflow-hidden">
            <div className="absolute h-full bg-cyan-400 rounded-full" style={{width: '80%'}}></div>
          </div>
          <div className="text-center mt-2 text-sm">
            총 <span className="text-cyan-500 font-bold">2920kcal</span> 중 <span className="text-cyan-500 font-bold">2310kcal</span>를 섭취하셨습니다.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-center mb-4">권장 영양소</h3>
          <div className="flex items-center justify-center gap-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" 
                        strokeDasharray="251.2" strokeDashoffset="62.8"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="12" 
                        strokeDasharray="251.2" strokeDashoffset="0" 
                        style={{strokeDashoffset: '62.8', strokeDasharray: '60 251.2'}}/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="12" 
                        strokeDasharray="251.2" 
                        style={{strokeDashoffset: '122.8', strokeDasharray: '32 251.2'}}/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">2820kcal</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                <span className="text-sm">탄수화물 : 380g (63.5%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-sm">단백질 : 150g (23.8%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-400 rounded"></div>
                <span className="text-sm">지방 : 80g (12.7%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="main" setScreen={setCurrentScreen} />
    </div>
  );

  // 캘린더 화면
  const CalendarScreen = () => {
    const dateKey = formatDate(selectedDate);
    const data = mealData[dateKey];
    const days = getCurrentMonthData();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm mb-4 flex items-center gap-2 p-3">
            <span className="text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="오늘은 어떤 음식을 드셨나요?" 
              className="flex-1 outline-none text-gray-600"
            />
            <span className="text-gray-400">📷</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <div 
              className="text-center text-xl font-bold mb-4 cursor-pointer"
              onClick={() => setShowDatePicker(true)}
            >
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 ▼
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div 
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg cursor-pointer
                    ${!day ? 'invisible' : ''}
                    ${isToday(day) ? 'bg-cyan-200 text-cyan-900 font-bold' : ''}
                    ${isSelectedDate(day) && !isToday(day) ? 'bg-cyan-400 text-white font-bold' : ''}
                    ${!isToday(day) && !isSelectedDate(day) ? 'hover:bg-gray-100' : ''}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-center text-2xl font-bold mb-6">
              {formatDate(selectedDate)}
            </div>

            {data && data.calories > 0 ? (
              <>
                <div className="flex justify-center gap-8 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">섭취 칼로리</div>
                    <div className="text-right font-bold text-lg">{data.calories} kcal</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">섭취 음식</div>
                    <div className="flex gap-2">
                      {data.foods.map((food, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">탄수화물</span>
                      <span className="font-medium">{data.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">섭취 영양소</span>
                      <span className="font-medium">단백질 {data.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span></span>
                      <span className="font-medium">지방 {data.fat}g</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">등록한 음식이 없습니다.</div>
                <button className="bg-gray-300 hover:bg-gray-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <span className="text-2xl">+</span>
                </button>
                <div className="text-sm text-gray-500 mt-2">추가하기</div>
              </div>
            )}
          </div>
        </div>

        {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80">
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="h-32 overflow-y-auto">
                    {[2024, 2025, 2026].map(year => (
                      <div 
                        key={year}
                        onClick={() => setTempYear(year)}
                        className={`py-2 cursor-pointer ${tempYear === year ? 'font-bold text-black' : 'text-gray-400'}`}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-2xl">년</div>
                <div className="text-center">
                  <div className="h-32 overflow-y-auto">
                    {[9, 10, 11].map(month => (
                      <div 
                        key={month}
                        onClick={() => setTempMonth(month)}
                        className={`py-2 cursor-pointer ${tempMonth === month ? 'font-bold text-black' : 'text-gray-400'}`}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-2xl">월</div>
              </div>
              
              <button 
                onClick={handleDatePickerConfirm}
                className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2"
              >
                확인
              </button>
            </div>
          </div>
        )}

        <BottomNav active="calendar" setScreen={setCurrentScreen} />
      </div>
    );
  };

  // 하단 네비게이션
  const BottomNav = ({ active, setScreen }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
      <button 
        onClick={() => setScreen('main')}
        className="flex flex-col items-center"
      >
        <span className={`text-2xl ${active === 'main' ? 'opacity-100' : 'opacity-40'}`}>📋</span>
      </button>
      <button 
        onClick={() => setScreen('calendar')}
        className="flex flex-col items-center"
      >
        <span className={`text-2xl ${active === 'calendar' ? 'opacity-100' : 'opacity-40'}`}>📅</span>
      </button>
      <button className="flex flex-col items-center">
        <span className="text-2xl opacity-40">🏆</span>
      </button>
      <button className="flex flex-col items-center">
        <span className="text-2xl opacity-40">👤</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white">
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'main' && <MainScreen />}
      {currentScreen === 'calendar' && <CalendarScreen />}
    </div>
  );
};

export default EatCheckApp;