// join.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 페이지 옮기는 데 사용
import '/src/styles/join.css';

const currentYear = new Date().getFullYear(); // 현재 연도
const categories = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '세계'];

function Join() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    birthYear: '',  // 연도
    birthMonth: '', // 월
    birthDay: '',   // 일
    password: '',
    passwordCheck: '',
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => {
      const isSelected = prev.category.includes(value);
      const newCategories = isSelected
        ? prev.category.filter(c => c !== value)
        : [...prev.category, value];
      return { ...prev, category: newCategories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // 여기에 실제 회원가입 로직 추가 가능
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />

          <label>이메일</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

          <label>성별</label>
          <div style={{ display: 'flex', gap: '20px' }} className="gender-selection">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              여성
            </label>
          </div>

          <label>생년월일</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* 연도 드롭다운 */}
            <select
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
            >
              <option value="">연도</option>
              {/* 현재 연도부터 80년 전까지 선택 */}
              {Array.from({ length: 81 }, (_, i) => (
                <option key={currentYear - i} value={currentYear - i}>
                  {currentYear - i}
                </option>
              ))}
            </select>

            {/* 월 드롭다운 */}
            <select
              name="birthMonth"
              value={formData.birthMonth}
              onChange={handleChange}
            >
              <option value="">월</option>
              {/* 1월부터 12월까지 선택 */}
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>

            {/* 일 드롭다운 */}
            <select
              name="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
            >
              <option value="">일</option>
              {/* 1일부터 31일까지 날짜 선택 */}
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}일
                </option>
              ))}
            </select>
          </div>

          <label>비밀번호</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

          <label>비밀번호 확인</label>
          <input type="password" name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} placeholder="Password Check" required />

          <label>관심 카테고리</label>
          <div className="category-options">
            {categories.map(cat => (
              <label key={cat}>
                <input
                  type="checkbox"
                  name="category"
                  value={cat}
                  checked={formData.category.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <p className="join-guide">이미 계정이 있으신가요?{"\u00A0"} <Link to="/login"><strong>Log In</strong></Link></p> {/* Log In 눌렀을 때 Login 페이지로 이동 */}
      </div>
    </div>
  );
}

export default Join;
