import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
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
    // 실제 네이버 뉴스 API 연동 시 axios로 대체
    setMainNews([
      {
        imageUrl: '', // 없으면 기본 썸네일로 대체됨
        title: '오늘의 주요 뉴스1 기사 제목이 길어지면 어떻게 될까...',
        summary: 'AI 요약 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 과연 몇글자까지 될까 백칠십',
        press: '언론사',
        time: '날짜',
      },
      {
        imageUrl: '',
        title: '오늘의 주요 뉴스2',
        summary: 'AI 요약',
        press: '언론사',
        time: '날짜',
      },
      {
        imageUrl: '',
        title: '오늘의 주요 뉴스3',
        summary: 'AI 요약',
        press: '언론사',
        time: '날짜',
      },
      {
        imageUrl: '',
        title: '오늘의 주요 뉴스4',
        summary: 'AI 요약',
        press: '언론사',
        time: '날짜',
      },
    ]);
    setRecommend([
      {
        imageUrl: '',
        title: '사용자 추천 뉴스1 기사 제목이 길어지면 어떻게 될까...',
        summary: 'AI 요약',
      },
      {
        imageUrl: '',
        title: '추천 뉴스2',
        summary: 'AI 요약',
      },
    ]);

  };

  return (
    <>
      <Header /> {/* 상단에 추가(로고, 검색창) */}
  
      <div className="main-container">
        <Category selected={selectedCategory} onSelect={setSelectedCategory} />
  
        <div className="news-wrapper">
          <MainNews articles={mainNews} title="🔥 주요 뉴스" />
          <Recommend articles={recommend} title="🎯 추천" />
        </div>
      </div>
    </>
  );
}

export default MainPage;
