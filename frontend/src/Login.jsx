import React from 'react'
import './css/login.css'
import eatCheckImg from './img/잇체크.png'

const Login = () => {
    const Login = () => {
        window.location.href('/Report.jsx');
    }

  return (
    <>
      <div className="login-container">
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
    </>
  )
}

export default Login
