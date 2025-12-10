import { useNavigate } from "react-router-dom";
import ClipboardImg from "../assets/Clipboard.png";
import CalendarImg from "../assets/Calendar.png";
import AwardImg from "../assets/Award.png";
import UserImg from "../assets/User.png";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "white",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        borderTop: "1px solid #ddd",
      }}
    >
      <button
        onClick={() => navigate("/report")}
        style={{ background: "transparent", border: 0 }}
      >
        <img src={ClipboardImg} width={24} />
      </button>

      <button
        onClick={() => navigate("/calendar")}
        style={{ background: "transparent", border: 0 }}
      >
        <img src={CalendarImg} width={24} />
      </button>

      <button
        onClick={() => navigate("/ranking")}
        style={{ background: "transparent", border: 0 }}
      >
        <img src={AwardImg} width={24} />
      </button>

      <button
        onClick={() => navigate("/user")}
        style={{ background: "transparent", border: 0 }}
      >
        <img src={UserImg} width={24} />
      </button>
    </footer>
  );
};

export default BottomNav;
