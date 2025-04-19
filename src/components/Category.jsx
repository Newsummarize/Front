import React from 'react';
import '../styles/category.css';

const categories = ['HOME', '정치', '경제', '사회', '생활/문화', 'IT/과학', '세계'];

function Category({ selected, onSelect }) {
  return (
    <div className="category">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={selected === cat ? 'selected' : ''}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;
