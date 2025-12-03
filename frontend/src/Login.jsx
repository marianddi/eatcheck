import React from 'react'
import './css/login.css'
<<<<<<< HEAD
import eatCheckImg from './img/eatcheck.png'

const Login = ({ onLogin }) => {
=======
import eatCheckImg from './img/잇체크.png'

const Login = () => {
>>>>>>> 69e1ee95b6356af6b9effcebcc4cce5e6a10227e
    const Login = () => {
        window.location.href('/Report.jsx');
    }

  return (
    <>
      <div className="login-container">
<<<<<<< HEAD
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
=======
        <section className="left-section">
          <img src={eatCheckImg} className="login-img" />
        </section>

        <section className="right-section">
          <input type="text" placeholder="아이디" className="input-type" /><br />
          <input type="password" placeholder="비밀번호" className="input-type" /><br />
          <button className="login-button" onClick={Login}>로그인</button>

          <div className="footer-links">
            <div className="sub">아이디 찾기</div>
            <div>|</div>
            <div className="sub">비밀번호 찾기</div>
            <div>|</div>
            <div className="sub">회원가입</div>
          </div>
        </section>
      </div>
>>>>>>> 69e1ee95b6356af6b9effcebcc4cce5e6a10227e
    </>
  )
}

export default Login
