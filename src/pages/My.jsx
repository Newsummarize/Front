import React, { useEffect, useState } from 'react';
import '/src/styles/my.css';

function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState("개인정보");

  // 예시 데이터
  const userInfo = {
    name: "김류화",
    email: "a@com",
    gender: "남자",
    birth: "yyyy년mm월dd일",
    categories: ["경제", "IT"],
  };

  // 관심 키워드
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (removeIdx) => {
    setKeywords(keywords.filter((_, idx) => idx !== removeIdx));
  };

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    }
  }, []);

  return (
    <div className="mypage-bg">
      <div className="mypage-container">
        {/* 사이드바 */}
        <div className="mypage-sidebar">
          <div
            className={`mypage-sidebar-item${selectedMenu === "개인정보" ? " active" : ""}`}
            onClick={() => setSelectedMenu("개인정보")}
          >
            개인정보
          </div>
          <div
            className={`mypage-sidebar-item${selectedMenu === "로그아웃" ? " active" : ""}`}
            onClick={() => setSelectedMenu("로그아웃")}
          >
            로그아웃
          </div>
        </div>

        {/* 세로 구분선 */}
        <div className="mypage-vertical-divider"></div>

        {/* 본문 */}
        <div className="mypage-content">
          {selectedMenu === "개인정보" && (
            <>
              <div className="mypage-content-title">개인정보</div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">이름</span>
                <span>{userInfo.name}</span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">Email</span>
                <span>{userInfo.email}</span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">성별</span>
                <span>{userInfo.gender}</span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">생년월일</span>
                <span>{userInfo.birth}</span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">관심 카테고리</span>
                <span>
                  {userInfo.categories.map((cat, idx) => (
                    <span key={idx} className="mypage-category-chip">{cat}</span>
                  ))}
                </span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">관심 키워드</span>
                <span className="mypage-info-value">
                  <div className="mypage-keyword-section">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={e => setKeywordInput(e.target.value)}
                      placeholder="추가할 키워드 입력"
                      className="mypage-keyword-input"
                    />
                    <button 
                    type="button"
                    onClick={handleAddKeyword}
                    className="mypage-keyword-add-btn"
                    >
                      추가
                    </button>
                  </div>
                  <div className="mypage-keyword-list">
                    {keywords.map((kw, idx) => (
                      <span key={idx} className="mypage-category-chip" style={{display: "inline-flex", 
                      alignItems: "center", marginRight: "8px", marginBottom: "8px"}}>
                    {kw}
                    <button
                      type="button"
                      className="mypage-keyword-delete-btn"
                      onClick={() => handleRemoveKeyword(idx)}
                      style={{marginLeft: "6px", background: "none", border: "none", color: "#1a66bc", 
                      fontSize: "15px", cursor: "pointer"}}
                      aria-label="키워드 삭제"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
                </span>
              </div>
            </>
          )}
          {selectedMenu === "로그아웃" && (
            <div className="mypage-logout-center">
              <div className="mypage-logout-message">로그아웃 하시겠습니까?</div>
              <button className="mypage-logout-btn">로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;