import React from "react";
import { useNavigate } from "react-router-dom"; // 추가
import Logo from "./Logo";
import Search from "./Search";
import '../styles/header.css';

function Header() {
  const navigate = useNavigate(); // 라우팅 제어 함수 가져오기

  return (
    <header className="header-container">
      <Logo />

      <div className="header-center">
        <Search />
      </div>

      <div className="header-icons">
        <button
          className="icon-button"
          onClick={() => navigate("/login")} // 클릭 시 로그인 페이지로 이동
        >
          👤
        </button>
        <button className="icon-button">❓</button>
      </div>
    </header>
  );
}

export default Header;
