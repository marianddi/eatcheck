// MyPageWrapper.jsx (최종 라우팅 구현)
import React, { useState } from 'react';
import MyPage from './MyPage';
// 🚨 현재까지 작업 완료된 서브 페이지 컴포넌트들을 임포트합니다.
import BodyInfoChange from './BodyInfoChange'; 
import PasswordChange from './PasswordChange';
import GoalChange from './GoalChange';
import AllergyFood from './AllergyFood';


const PAGE_STATE = {
    MAIN: 'main',
    BODY_INFO_CHANGE: 'bodyInfoChange',
    PASSWORD_CHANGE: 'passwordChange',
    GOAL_CHANGE: 'goalChange',
    ALLERGY_FOOD: 'allergyFood',
    NICKNAME_CHANGE: 'nicknameChange',
};

export default function MyPageWrapper() {
    const [currentPage, setCurrentPage] = useState(PAGE_STATE.MAIN);

    /**
     * MyPage에서 메뉴 클릭 시 호출될 함수 (상세 페이지로 이동)
     * @param {string} pageName - 이동할 페이지 이름
     */
    const navigateTo = (pageName) => {
        switch (pageName) {
            case '신체 조건 변경':
                setCurrentPage(PAGE_STATE.BODY_INFO_CHANGE);
                break;
            case '비밀번호 변경':
                setCurrentPage(PAGE_STATE.PASSWORD_CHANGE);
                break;
            case '목표 변경':
                setCurrentPage(PAGE_STATE.GOAL_CHANGE);
                break;
            case '알레르기 음식 리스트':
                setCurrentPage(PAGE_STATE.ALLERGY_FOOD);
                break;
            case '닉네임 수정':
                setCurrentPage(PAGE_STATE.NICKNAME_CHANGE);
                break;
            default:
                console.warn(`${pageName} 페이지에 대한 라우팅 정의가 없습니다.`);
                break;
        }
    };

    /**
     * 서브 페이지에서 뒤로가기 버튼 클릭 시 호출될 함수 (메인 페이지로 복귀)
     */
    const goBack = () => {
        setCurrentPage(PAGE_STATE.MAIN);
    };

    const renderPage = () => {
        switch (currentPage) {
            case PAGE_STATE.MAIN:
                return <MyPage navigateTo={navigateTo} />;
            case PAGE_STATE.BODY_INFO_CHANGE:
                // BodyInfoChange 컴포넌트에 onBack 함수 전달
                return <BodyInfoChange onBack={goBack} />;
            case PAGE_STATE.PASSWORD_CHANGE:
                // PasswordChange 컴포넌트에 onBack 함수 전달
                return <PasswordChange onBack={goBack} />;
            case PAGE_STATE.GOAL_CHANGE:
                // GoalChange 컴포넌트에 onBack 함수 전달
                return <GoalChange onBack={goBack} />;
            case PAGE_STATE.ALLERGY_FOOD:
                // AllergyFood 컴포넌트에 onBack 함수 전달
                return <AllergyFood onBack={goBack} />;
            case PAGE_STATE.NICKNAME_CHANGE:
                // 닉네임 수정 페이지는 별도 컴포넌트가 없으므로 임시로 표시
                return (
                    <div className="body-info-container">
                        <header className="bic-header">
                            <button className="bic-back-btn" onClick={goBack}>
                                <img src="./assets/back.png" alt="뒤로가기" />
                            </button>
                            <h1 className="bic-title">닉네임 수정 (구현 예정)</h1>
                        </header>
                        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                            닉네임 수정 페이지 내용이 여기에 들어갑니다.
                        </div>
                    </div>
                );
            default:
                return <MyPage navigateTo={navigateTo} />;
        }
    };

    return (
        // .app-container는 전체 뷰포트를 채우는 래퍼로 가정합니다.
        <div className="app-container">
            {renderPage()}
        </div>
    );
}