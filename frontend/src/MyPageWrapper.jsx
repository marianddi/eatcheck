// MyPageWrapper.jsx
import React, { useState } from 'react';
import MyPage from './MyPage';
import BodyInfoChange from './BodyInfoChange';
import PasswordChange from './PasswordChange';
import GoalChange from './GoalChange';
import AllergyFood from './AllergyFood';


const PAGE_STATE = {
    MAIN: 'main',
    BODY_INFO_CHANGE: 'bodyInfoChange',
    PASSWORD_CHANGE: 'passwordChange',
    GOAL_CHANGE: 'goalChange',
    ALLERGY_FOOD: 'allergyFood'
};

export default function MyPageWrapper() {
    const [currentPage, setCurrentPage] = useState(PAGE_STATE.MAIN);

    // MyPage에서 메뉴 클릭 시 호출될 함수
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
            default:
                alert(`${pageName} 페이지로 이동합니다. (라우팅 없음)`);
                break;
        }
    };

    // 서브 페이지에서 뒤로가기 버튼 클릭 시 호출될 함수
    const goBack = () => {
        setCurrentPage(PAGE_STATE.MAIN);
    };

    const renderPage = () => {
        switch (currentPage) {
            case PAGE_STATE.MAIN:
                return <MyPage navigateTo={navigateTo} />;
            case PAGE_STATE.BODY_INFO_CHANGE:
                return <BodyInfoChange onBack={goBack} />;
            case PAGE_STATE.PASSWORD_CHANGE:
                return <PasswordChange onBack={goBack} />;
            case PAGE_STATE.GOAL_CHANGE:
                return <GoalChange onBack={goBack} />;
            case PAGE_STATE.ALLERGY_FOOD:
                return <AllergyFood onBack={goBack} />;
            default:
                return <MyPage navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="app-container">
            {renderPage()}
        </div>
    );
}