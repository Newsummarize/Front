import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Category from '../components/Category';
import MainNews from '../components/MainNews';
import Recommend from '../components/Recommend';
import '../styles/main.css';

function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState('HOME');
  const [mainNews, setMainNews] = useState([]);
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    // 여기서 API 호출해서 mainNews, recommendedNews, categoryNews 세팅
    fetchNewsData();
  }, [selectedCategory]);

  const fetchNewsData = async () => {
    try {
      const resMain = await axios.get('https://newsummarize.com/api/news/main', {
        withCredentials: true
      });
      console.log("응답 전체:", resMain.data);

      // const resRecommend = await axios.get('https://newsummarize.com/api/news/recommend', {
      //   withCredentials: true
      // });
      // console.log("응답 전체:", resRecommend.data);

      const mainNews = resMain.data;
      // const recommend = resRecommend.data;
  
      setMainNews(mainNews.map(news => ({
        imageUrl: news.imageUrl,
        title: news.title,
        summary: news.content || "요약없음", 
        press: news.publisher,
        time: news.publishedAt,
      })));
  
      // setRecommend(recommend.map(news => ({
      //   imageUrl: news.imageUrl,
      //   title: news.title,
      //   summary: news.content || "요약없음",
      //   press: news.publisher,
      //   time: news.publishedAt,
      // })));
    } catch (error) {
      console.error('뉴스 데이터 불러오기 실패', error);
    }
  };
  

  return (
    <div className="main-container">
      <Category selected={selectedCategory} onSelect={setSelectedCategory} />

      <div className="news-wrapper">
        <MainNews articles={mainNews} title="🔥 주요 뉴스" />
        <Recommend articles={recommend} title="🎯 추천" />
      </div>
    </div>
  );
}

export default MainPage;
