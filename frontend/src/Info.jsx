import React from 'react'
import './css/Info.css'

const Info = ({ onInput }) => {
    // const Input = () => {
    //     window.location.href('/Report.jsx');
    // }

  return (
    <>
      <div>
        <h2>저희는 식단을 도와드려요!</h2>
        <h3>아래의 정보를 입력해 주세요.</h3>
      </div>
      <div className="login-container">
            <div className="right-section">
              <input 
                type="text" 
                placeholder="나이" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="성별" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="키(cm)" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="몸무게(kg)" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="목표 체중" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="달성 기간(D-day)" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="기초대사량" 
                className="input-type"
              />
              <input 
                type="text" 
                placeholder="주당 운동시간" 
                className="input-type"
              />
              <button 
                onClick={onInput}
                className="login-button"
              >
                확인
              </button>
              
            </div>
          </div>
    </>
  )
}

export default Info
