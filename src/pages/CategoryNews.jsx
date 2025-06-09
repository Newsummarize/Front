import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Category from '../components/Category';
import '../styles/categorynews.css';

function formatDate(datetimeStr) {
  if (!datetimeStr) return '';
  const [date, time] = datetimeStr.split('T');
  const hhmm = time?.slice(0, 5);
  return `${date} ${hhmm}`;
}

function CategoryNews() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!categoryName) {
      setArticles([]);
      return;
    }

    const normalizedCategory = categoryName.toLowerCase();

    const fetchCategoryNews = async () => {
      try {
        const res = await axios.get('https://newsummarize.com/api/news/category', {
          params: { category: normalizedCategory }
        });
        const data = res.data;

        if (Array.isArray(data)) {
          setArticles(data);
        } else if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('카테고리 뉴스 불러오기 실패:', error);
        setArticles([]);
      }
    };

    fetchCategoryNews();
  }, [categoryName]);

  return (
    <div>
      {/* 카테고리 목록 UI */}
      <Category selected={categoryName} onSelect={() => { }} />

      {/* 뉴스 리스트 UI */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="categorynews-container">
          <ul className="categorynews-list">
            {articles.map((article) => (
              <li
                key={article.id}
                className="cate-news-item horizontal"
                onClick={() => window.open(article.url, "_blank")}
              >
                <img
                  src={article.imageUrl || '/src/assets/default.png'}
                  alt={article.title}
                  className="cate-news-thumbnail horizontal"
                />
                <div className="cate-news-content">
                  <div>
                    <p className="cate-news-title">{article.title}</p>
                    <p className="cate-news-summary">{article.content || '본문에서 확인해주세요.'}</p>
                  </div>
                  <p className="cate-news-meta">
                    {article.publisher} · {formatDate(article.publishedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategoryNews;
