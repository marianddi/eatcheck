import React from 'react'
import './css/login.css'
import eatCheckImg from './img/eatcheck.png'

const Login = ({ onLogin }) => {
    const Login = () => {
        window.location.href('/Report.jsx');
    }

  return (
    <>
      <div className="login-container">
            <div className="left-section">
              <img src={eatCheckImg} alt="잇체크 로고" style={{width: '200px', height: 'auto', marginBottom: '20px'}} />
            </div>
            
            <div className="right-section">
              <input 
                type="text" 
                placeholder="아이디" 
                className="input-type"
              />
              
              <input 
                type="password" 
                placeholder="비밀번호" 
                className="input-type"
              />
              
              <button 
                onClick={onLogin}
                className="login-button"
              >
                로그인
              </button>
              
              <div className="footer-links">
                <span className="sub">아이디 찾기</span>
                <span>|</span>
                <span className="sub">비밀번호 찾기</span>
                <span>|</span>
                <span className="sub">회원가입</span>
              </div>
            </div>
          </div>
    </>
  )
}

export default Login
