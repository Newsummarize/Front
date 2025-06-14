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
        console.log("첫 뉴스:", res.data[0]);
        setMainNews(res.data.map(news => ({
          imageUrl: news.imageUrl,
          title: news.title,
          summary: news.content || "본문에서 확인해주세요.",
          press: news.publisher,
          time: news.publishedAt,
          url: news.url,
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
        console.log("isLoggedIn:", isLoggedIn);
        console.log("token:", token);

        try {
          const res = await axios.get("https://newsummarize.com/api/news/recommend",
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          setRecommend(res.data.map(news => ({
            imageUrl: news.imageUrl,
            title: news.title,
            summary: news.content || "본문에서 확인해주세요.",
            press: news.publisher,
            time: news.publishedAt,
            url: news.url,
          })));
        } catch (err) {
          console.error("추천 뉴스 오류:", err);
          if (err.response) {
            console.log("응답 메시지:", err.response.data);
          }
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
        onSelect={() => { }}
      />
      <div className="news-wrapper">
        <MainNews articles={mainNews} title="🔥 주요 뉴스" />
        <Recommend articles={recommend} title="🎯 추천" isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default MainPage;
