import React from 'react'
import './css/SignUp.css'

const SignUp = ({ onSignup }) => {
    // const Input = () => {
    //     window.location.href('/Report.jsx');
    // }

  return (
    <>
      <div>
        <h3>회원가입</h3>
      </div>
      <div className="login-container">
            <div className="right-section">
              <input 
                type="text" 
                placeholder="닉네임" 
                className="input-type"
              />
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
              <input 
                type="password" 
                placeholder="비밀번호 확인" 
                className="input-type"
              />
              <div className='password-match'>비밀번호가 일치합니다.</div>
              <input 
                type="text" 
                placeholder="이메일 (example@gmail.com)" 
                className="input-type"
              />
              {/* <button 
                onClick={onAuth}
                className="login-button"
              >
                인증번호 발송하기
              </button> */}
              <input 
                type="password" 
                placeholder="인증번호" 
                className="input-type"
              />
              <button 
                onClick={onSignup}
                className="login-button"
              >
                확인
              </button>
              
            </div>
          </div>
    </>
  )
}

export default SignUp
