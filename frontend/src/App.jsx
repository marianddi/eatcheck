import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Report from "./pages/Report";
import FindID from "./pages/FindID";
import FindPW from "./pages/FindPW";
import Calendar from "./pages/Calendar";
import Ranking from "./pages/Ranking";
import UserPage from "./pages/UserPage";
import Info from "./pages/Info";
import Search from "./pages/Search";
import api from "./api/axios";

function App() {

  /* -------------------------------------------------------
    ⭐ 회원가입 처리 함수
  -------------------------------------------------------- */
  const handleSignup = async (nickname, userId, pw1, pw2, email, code) => {
    if (pw1 !== pw2) {
      alert("비밀번호가 일치하지 않습니다 ❌");
      return;
    }

    try {
      const res = await api.post("/api/auth/signup", {
        nickname,
        userId,
        password: pw1,
        email,
        code
      });

      if (res.data.success) {
        alert("회원가입 완료 🎉");
      } else {
        alert("회원가입 실패 ❌ 다시 확인해주세요");
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  /* -------------------------------------------------------
    ⭐ 이메일 인증번호 발송
    (백엔드 기능에서 제거함)
  -------------------------------------------------------- */
  /*const handleSendCode = async (email) => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }

    try {
      const res = await api.post("/api/auth/send-code", { email });

      if (res.data.success) {
        alert("인증번호를 이메일로 발송했습니다 ✔");
      } else {
        alert("이메일 발송 실패 ❌ 다시 시도해주세요");
      }
    } catch (err) {
      console.error("메일 전송 오류:", err);
      alert("메일 서버와 통신 중 오류 발생");
    }
  };*/

  /* -------------------------------------------------------
    ⭐ 라우트 설정
  -------------------------------------------------------- */

  return (
    <BrowserRouter>
      <Routes>

        {/* 로그인 */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 프로필 입력 (로그인 후 첫 화면) */}
        <Route path="/info" element={<Info />} />

        {/* 대시보드 / 보고 화면 */}
        <Route path="/report" element={<Report />} />

        {/* 검색 화면 */}
        <Route path="/search" element={<Search />} />

        {/* 캘린더 */}
        <Route path="/calendar" element={<Calendar />} />

        {/* 랭킹 */}
        <Route path="/ranking" element={<Ranking />} />

        {/* 마이페이지 */}
        <Route path="/user" element={<UserPage />} />

        {/* 회원가입 */}
        <Route
          path="/signup"
          element={
            <SignUp
              onSignup={handleSignup}
            />
          }
        />

        {/* 아이디 찾기 */}
        <Route path="/find-id" element={<FindID />} />

        {/* 비밀번호 찾기 */}
        <Route path="/find-pw" element={<FindPW />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
