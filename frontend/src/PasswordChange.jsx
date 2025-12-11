// PasswordChange.jsx
import React, { useState } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

const DUMMY_REQUEST = { userPk: 1 };

export default function PasswordChange({ onBack }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');

    const handleSubmit = async () => {
        if (!password || !newPassword || !newPasswordCheck) {
            alert("모든 비밀번호 필드를 입력해주세요.");
            return;
        }
        if (newPassword !== newPasswordCheck) {
            alert("새 비밀번호와 확인이 일치하지 않습니다.");
            return;
        }

        try {
            const payload = {
                userPk: DUMMY_REQUEST.userPk,
                password,
                newPassword,
                newPasswordCheck,
            };

            // API 호출: POST /mypage/changePw
            // (API 호출 로직 생략)

            alert("[더미 테스트] 비밀번호 변경 요청 완료. 서버 로직 확인 필요.");
            onBack();

        } catch (error) {
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="body-info-container">
            {/* 상단 헤더 */}
            <header className="bic-header">
                <button className="bic-back-btn" onClick={onBack}>
                    <img src={iconBack} alt="뒤로가기" />
                </button>
                <h1 className="bic-title">비밀번호 변경</h1>
            </header>

            {/* 정보 입력 박스 (BodyInfoChange의 스타일 재활용) */}
            <div className="info-box-wrapper" style={{ marginTop: '50px' }}>

                <div className="info-item">
                    <span className="info-label">현재 비밀번호</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="info-item">
                    <span className="info-label">새 비밀번호</span>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <div className="info-item">
                    <span className="info-label">새 비밀번호 확인</span>
                    <input type="password" value={newPasswordCheck} onChange={(e) => setNewPasswordCheck(e.target.value)} />
                </div>

            </div>

            {/* 저장 버튼 영역 */}
            <div className="bottom-fixed-area">
                <button
                    className="bic-save-btn"
                    onClick={handleSubmit}
                >
                    변경 하기
                </button>
            </div>
        </div>
    );
}