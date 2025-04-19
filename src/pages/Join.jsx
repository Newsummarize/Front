// sign.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 페이지 옮기는 데 사용
import '/src/styles/join.css';

const categories = ['정치', '경제', '사회', '생활', '연예', '스포츠', 'IT/과학'];

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // 여기에 실제 회원가입 로직 추가 가능
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />

          <label>이메일</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

          <label>생년월일</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type='number'
              placeholder='연'
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
            />

            <select
              value={formData.birthMonth}
              onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}월</option>
              ))}
            </select>

            <input
              type='number'
              placeholder='일'
              value={formData.birthDay}
              onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
            />
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
        <p>이미 계정이 있으신가요? <Link to="/login"><strong>Log In</strong></Link></p> {/* Log In 눌렀을 때 Join 페이지로 이동동 */}
      </div>
    </div>
  );
}

export default Join;