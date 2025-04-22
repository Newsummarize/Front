import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // navigate, location
import "../styles/header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인/회원가입 페이지에서는 Search + 버튼 모두 숨김
  const hideOnPaths = ["/login", "/join"];
  const shouldHideExtras = hideOnPaths.includes(location.pathname);

  const [keyword, setKeyword] = useState(""); // 검색어 상태

  // 로고 클릭 시 검색어 초기화하고 메인 페이지로 이동
  const handleLogoClick = () => {
    setKeyword(""); // 검색어 초기화
    navigate("/main", { replace: true }); // 쿼리 파라미터 없이 메인 페이지로 이동
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value); // 검색어 상태 업데이트
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/keyword/${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <header className="header-container">
      {/* 로고 클릭 시 메인 페이지로 이동 */}
      <div className="header-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        NewSummarize
      </div>

      {!shouldHideExtras && (
        <div className="header-center">
          {/* 검색창 */}
          <div className="header-search">
            <input
              type="text"
              placeholder="Keyword 검색"
              value={keyword}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(); // Enter 키 누르면 검색
              }}
            />
            <button className="search-button" onClick={handleSearch}>🔍</button>
          </div>
        </div>
      )}

      {!shouldHideExtras && (
        <div className="header-icons">
          <button className="icon-button" onClick={() => navigate("/login")}>👤</button>
          <button className="icon-button">❓</button>
        </div>
      )}
    </header>
  );
}

export default Header;
