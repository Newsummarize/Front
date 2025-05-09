import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 페이지 옮기는 데 사용
import '/src/styles/my.css';

function MyPage() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      category: ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert("개인정보가 수정되었습니다.");
    };
  
    return (
      <div className="mypage-bg">
        <div className="mypage-container">
          <div className="mypage-sidebar">
            <div className="mypage-title">개인정보</div>
          </div>
          {/* 세로 점선 divider 추가 */}
          <div className="mypage-vertical-divider"></div>
          <div className="mypage-content">
            <form onSubmit={handleSubmit}>
              <div className="mypage-form-group">
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mypage-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mypage-form-group">
                <label>관심 카테고리</label>
                <input
                  type="text"
                  name="category"
                  placeholder="관심 카테고리"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="mypage-submit-btn">
                개인정보 수정
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default MyPage;