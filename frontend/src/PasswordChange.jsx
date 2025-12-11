// PasswordChange.jsx (API 연동 및 디자인 통일 최종본)
import React, { useState } from "react";
import "./BodyInfoChange.css"; // 서브 페이지 공통 CSS 사용
import iconBack from "./assets/back.png";

// --- 상수 설정 ---
const BASE_URL = "http://localhost:8080"; 
const USER_PK = 1; 

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
        // 새 비밀번호는 8자 이상 등 백엔드 유효성 검사를 통과해야 함 (프론트엔드에서 최소한의 검증 추가 가능)
        if (newPassword.length < 8) {
             alert("새 비밀번호는 최소 8자 이상이어야 합니다.");
             return;
        }

        try {
            const payload = {
                userPk: USER_PK,
                password, // 현재 비밀번호
                newPassword, // 새 비밀번호
                newPasswordCheck, // 새 비밀번호 확인 (백엔드에서 사용)
            };
            
            // API 호출: POST /mypage/changePw
            const response = await fetch(`${BASE_URL}/mypage/changePw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            
            // 🚨 응답 구조: status: "OK" 확인
            if (json.status === "OK") {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                onBack(); // 성공 시 메인 페이지로 복귀
            } else {
                // 실패 메시지 처리 (예: 현재 비밀번호 불일치 등)
                alert(`비밀번호 변경 실패: ${json.message || '알 수 없는 오류'}`);
            }

        } catch (error) {
            console.error("비밀번호 변경 오류:", error);
            alert("비밀번호 변경 중 통신 오류가 발생했습니다.");
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
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="현재 비밀번호를 입력해주세요"
                    />
                </div>

                <div className="info-item">
                    <span className="info-label">새 비밀번호</span>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="새 비밀번호 (8자 이상)"
                    />
                </div>

                <div className="info-item">
                    <span className="info-label">새 비밀번호 확인</span>
                    <input 
                        type="password" 
                        value={newPasswordCheck} 
                        onChange={(e) => setNewPasswordCheck(e.target.value)} 
                        placeholder="새 비밀번호를 다시 입력해주세요"
                    />
                </div>

            </div>

            {/* 저장 버튼 영역 (디자인 및 색상 통일) */}
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