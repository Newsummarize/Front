import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import '/src/styles/my.css';

function MyPage() {
  const { isLoggedIn, token, logout } = useAuth();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("개인정보");

  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    year: 0,
    month: 0,
    day: 0,
    gender: "",
    defaultInterests: [],
  });

  // 관심 키워드
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://newsummarize.com/api/users/logout',
        null,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      logout(); // 토큰 제거 + 로그인 상태 초기화
      navigate('/login'); // 로그인 페이지로 이동
    } catch (err) {
      console.error('로그아웃 실패:', err);
      alert('로그아웃에 실패했습니다.');
    }
  };

  const handleAddKeyword = async () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      try {
        await axios.post(
          `https://newsummarize.com/api/users/interests?interest=${encodeURIComponent(trimmed)}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setKeywords([...keywords, trimmed]);
        setKeywordInput("");
      } catch (err) {
        console.error("키워드 추가 실패:", err);
        alert("키워드 추가에 실패했습니다.");
      }
    }
  };

  const handleRemoveKeyword = async (removeIdx) => {
    const keywordToRemove = keywords[removeIdx];

    try {
      await axios.delete(
        `https://newsummarize.com/api/users/interests?interest=${encodeURIComponent(keywordToRemove)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setKeywords(keywords.filter((_, idx) => idx !== removeIdx));
    } catch (err) {
      console.error("키워드 삭제 실패:", err);
      alert("키워드 삭제에 실패했습니다.");
    }
  };

  // 사용자 정보 불러오기
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fetchUserData = async () => {
      try {
        const res = await axios.get("https://newsummarize.com/api/users/my", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setUserInfo({
          userName: data.userName || "",
          email: data.email || "",
          year: data.year || 0,
          month: data.month || 0,
          day: data.day || 0,
          gender: data.gender || "",
          defaultInterests: data.defaultInterests || [],
        });
        setKeywords(data.customInterests || []);
      } catch (err) {
        console.error("사용자 정보 요청 실패:", err);
      }
    };

    fetchUserData();

    return () => {
      document.body.style.overflow = original;
    };
  }, [isLoggedIn, token]);

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
                <span>{userInfo.userName}</span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">Email</span>
                <span>{userInfo.email}</span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">성별</span>
                <span>
                  {userInfo.gender === 'M' ? '남자' : userInfo.gender === 'F' ? '여자' : '기타'}
                </span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">생년월일</span>
                <span>
                  {`${userInfo.year}-${String(userInfo.month).padStart(2, '0')}-${String(userInfo.day).padStart(2, '0')}`}
                </span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label">관심 카테고리</span>
                <span>
                  {userInfo.defaultInterests.map((cat, idx) => (
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
                </span>
              </div>
              <div className="mypage-info-row">
                <span className="mypage-info-label"></span>
                <span className="mypage-keyword-list">
                  {keywords.map((kw, idx) => (
                    <span key={idx} className="mypage-category-chip" style={{
                      display: "inline-flex",
                      alignItems: "center", marginRight: "4px", marginBottom: "4px"
                    }}>
                      {kw}
                      <button
                        type="button"
                        className="mypage-keyword-delete-btn"
                        onClick={() => handleRemoveKeyword(idx)}
                        style={{
                          marginLeft: "6px", background: "none", border: "none", color: "#1a66bc",
                          fontSize: "15px", cursor: "pointer"
                        }}
                        aria-label="키워드 삭제"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </span>
              </div>
            </>
          )}
          {selectedMenu === "로그아웃" && (
            <div className="mypage-logout-center">
              <div className="mypage-logout-message">로그아웃 하시겠습니까?</div>
              <button className="mypage-logout-btn" onClick={handleLogout}>로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;