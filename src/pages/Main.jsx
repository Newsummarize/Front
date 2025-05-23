import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import Category from '../components/Category';
import MainNews from '../components/MainNews';
import Recommend from '../components/Recommend';
import '../styles/main.css';

function MainPage() {
  const { isLoggedIn, token } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('HOME');
  const [mainNews, setMainNews] = useState([]);
  const [recommend, setRecommend] = useState([]);

  console.log("MainPage 렌더링 - isLoggedIn:", isLoggedIn, "| token:", token);

  // 메인 뉴스 가져오기 (로그인 여부와 무관)
  useEffect(() => {
    const fetchMainNews = async () => {
      try {
        const res = await axios.get('https://newsummarize.com/api/news/main');
        const mainNews = res.data;
        console.log("메인 뉴스 응답:", mainNews);
        setMainNews(mainNews.map(news => ({
          imageUrl: news.imageUrl,
          title: news.title,
          summary: news.content || "요약없음",
          press: news.publisher,
          time: news.publishedAt,
        })));
      } catch (error) {
        console.error('메인 뉴스 불러오기 실패', error);
      }
    };

    fetchMainNews();
  }, [selectedCategory]);

  // 추천 뉴스 가져오기 (로그인 상태일 때만)
  useEffect(() => {
    console.log("useEffect 실행됨 - isLoggedIn:", isLoggedIn, "| token:", token);

    const fetchRecommend = async () => {
      if (isLoggedIn && token) {
        try {
          console.log("추천 뉴스 요청 시작");
          const res = await axios.get("https://newsummarize.com/api/news/recommend", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('추천 뉴스 응답:', res.data);
          setRecommend(res.data.map(news => ({
            imageUrl: news.imageUrl,
            title: news.title,
            summary: news.content || "요약없음",
            press: news.publisher,
            time: news.publishedAt,
          })));
        } catch (err) {
          console.error("추천 뉴스 오류:", err);
        }
      } else {
        console.log("추천 뉴스 요청 안 함 - 로그인 안 됨 또는 토큰 없음");
        setRecommend([]); // 로그아웃 시 추천 뉴스 초기화
      }
    };
    fetchRecommend();
  }, [isLoggedIn, token]);

  return (
    <div className="main-container">
      <Category selected={selectedCategory} onSelect={setSelectedCategory} />

      <div className="news-wrapper">
        <MainNews articles={mainNews} title="🔥 주요 뉴스" />
        <Recommend articles={recommend} title="🎯 추천" isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default MainPage;
