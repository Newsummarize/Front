import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import Category from '../components/Category';
import MainNews from '../components/MainNews';
import Recommend from '../components/Recommend';
import '../styles/main.css';

function MainPage() {
  const { isLoggedIn, token } = useAuth();

  const [mainNews, setMainNews] = useState([]);
  const [recommend, setRecommend] = useState([]);

  // 메인 뉴스 가져오기 (로그인 여부와 무관)
  useEffect(() => {
    const fetchMainNews = async () => {
      try {
        const res = await axios.get('https://newsummarize.com/api/news/main');
        const mainNews = res.data;
        setMainNews(mainNews.map(news => ({
          imageUrl: news.imageUrl,
          title: news.title,
          summary: news.content,
          press: news.publisher,
          time: news.publishedAt,
        })));
      } catch (error) {
        console.error('메인 뉴스 불러오기 실패', error);
      }
    };
    fetchMainNews();
  }, []);

  // 추천 뉴스 가져오기 (로그인 상태일 때만)
  useEffect(() => {
    if (isLoggedIn && token) {
      const fetchRecommend = async () => {
        try {
          const res = await axios.get("https://newsummarize.com/api/news/recommend", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRecommend(res.data.map(news => ({
            imageUrl: news.imageUrl,
            title: news.title,
            summary: news.content || "요약 정보가 없습니다",
            press: news.publisher,
            time: news.publishedAt,
          })));
        } catch (err) {
          console.error("추천 뉴스 오류:", err);
        }
      };
      fetchRecommend();
    } else {
      setRecommend([]);
    }
  }, [isLoggedIn, token]);

  return (
    <div className="main-container">
       <Category
        selected="HOME"
        onSelect={() => {}}
      />
      <div className="news-wrapper">
        <MainNews articles={mainNews} title="🔥 주요 뉴스" />
        <Recommend articles={recommend} title="🎯 추천" isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default MainPage;
