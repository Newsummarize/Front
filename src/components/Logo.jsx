import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/logo.css';

function Logo() {
  const navigate = useNavigate();

  return (
    <div
      className="header-logo"
      onClick={() => navigate("/main")}
      style={{ cursor: "pointer" }} // 클릭 가능한 느낌
    >
      NewSummarize
    </div>
  );
}

export default Logo;
