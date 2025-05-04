// join.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/src/styles/join.css';

const currentYear = new Date().getFullYear();
const categories = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '세계'];

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const postData = {
      userName: formData.name,
      year: parseInt(formData.birthYear),
      month: parseInt(formData.birthMonth),
      day: parseInt(formData.birthDay),
      gender: formData.gender === 'male' ? 'M' : 'F',
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.passwordCheck,
      interests: formData.category
    };

    try {
      const res = await axios.post('https://newsummarize.com/api/users', postData, {
        headers: {
          'Content-Type': 'application/json'
        },
        // withCredentials: true
      });

      console.log('회원가입 성공:', res.data);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error('회원가입 실패:', error);
    
      if (error.response) {
        if (error.response.status === 403) {
          alert("이미 가입된 이메일입니다.");
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("네트워크 오류가 발생했습니다.");
      }
    }    
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
            <select name="birthYear" value={formData.birthYear} onChange={handleChange}>
              <option value="">연도</option>
              {Array.from({ length: 81 }, (_, i) => (
                <option key={currentYear - i} value={currentYear - i}>
                  {currentYear - i}
                </option>
              ))}
            </select>

            <select name="birthMonth" value={formData.birthMonth} onChange={handleChange}>
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>

            <select name="birthDay" value={formData.birthDay} onChange={handleChange}>
              <option value="">일</option>
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
        <p className="join-guide">
          이미 계정이 있으신가요?{" "}
          <Link to="/login">
            <strong>Log In</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Join;
