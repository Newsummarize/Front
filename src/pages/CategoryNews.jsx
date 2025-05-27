import React, { useState } from 'react';
import Category from '../components/Category';
import '../styles/categorynews.css';

const dummyArticles = [
  { id: 1, title: "정치 뉴스 제목", summary: "정치 관련 주요 소식입니다.",
    img: "https://via.placeholder.com/200x120/1976d2/ffffff?text=Politics"},
  { id: 2, title: "경제 뉴스 제목", summary: "경제 관련 주요 소식입니다.",
    img: "https://via.placeholder.com/200x120/4caf50/ffffff?text=Economy"},
  { id: 3, title: "사회 뉴스 제목", summary: "사회 관련 주요 소식입니다.",
    img: "https://via.placeholder.com/200x120/ff9800/ffffff?text=Society"},
  { id: 4, title: "생활/문화 뉴스 제목", summary: "생활/문화 관련 주요 소식입니다.",
    img: "https://via.placeholder.com/200x120/9c27b0/ffffff?text=Culture"},
  { id: 5, title: "IT/과학 뉴스 제목", summary: "IT/과학 관련 주요 소식입니다.",
    img: "https://via.placeholder.com/200x120/03a9f4/ffffff?text=IT"},
  { id: 6, title: "세계 뉴스 제목", summary: "세계 관련 주요 소식입니다.",
    img: "https://via.placeholder.com/200x120/ff5722/ffffff?text=World"},
];

function truncate(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
}

function CategoryNews({ articles = dummyArticles }) {
const [selected, setSelected] = useState('HOME');
const filtered = selected === 'HOME'
    ? dummyArticles
    : dummyArticles.filter(news => news.category === selected);

  return (
    <div className="news-wrapper">
      <div className="news-list">
        {articles.map((news) => (
          <div key={news.id} className="news-item">
            <div className="news-thumbnail">
              <img src={news.img} alt="뉴스 썸네일" />
            </div>
            <div className="news-content">
              <h3 className="news-title">{news.title}</h3>
              <p className="news-summary">{truncate(news.summary, 100)}</p>
              <div className="news-meta">
                <span className="news-press">{news.press}</span>
                <span className="news-time">{news.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNews;