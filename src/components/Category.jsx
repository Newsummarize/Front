import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/category.css';

const categories = ['HOME', '정치', '경제', '사회', '생활/문화', 'IT/과학', '세계'];

function Category({ selected, onSelect }) {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    onSelect(cat);  // 상태 업데이트 함수 호출

    if (cat === 'HOME') {
      window.location.href = "/";
    } else {
      window.location.href = `/category/${encodeURIComponent(cat)}`;
    }
  };

  return (
    <div className="category">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={selected === cat ? 'selected' : ''}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;
