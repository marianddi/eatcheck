import React, { useState } from 'react'
import "./css/dashboard.css";
// Chart.js import 추가


const Report = () => {
  const [searchQuery, setSearchQuery] = useState('')

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

        <h2 className="text-xl font-bold text-center mb-4">홍길동님 오늘도 화이팅!</h2>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-4">
           막대그래프 들어갈 자리
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          도넛 그래프 들어갈 자리
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
    
    {/* 메인 */}
    <button 
      className="flex flex-col items-center"
    >
      <img src='./img/Clipboard.png'/>
    </button>

    {/* 캘린더 */}
    <button 
      className="flex flex-col items-center"
    >
      <img src='./img/Calendar.png'/>
    </button>

    {/* 도전과제 */}
    <button 
      className="flex flex-col items-center"
    >
      <img src='./img/Award.png'/>
    </button>

    {/* 프로필 */}
    <button 
      className="flex flex-col items-center"
    >
      <img src='./img/User.png'/>
    </button>

  </div>
    </div>
    
  )
}

export default Report