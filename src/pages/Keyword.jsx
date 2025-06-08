import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom"; // 검색어 가져오기
import KeywordNews from "../components/KeywordNews";
import AISummary from "../components/AISummary";
import Traffic from "../components/Traffic";
import "../styles/keyword.css";

function Keyword() {
  const { keyword } = useParams(); // URL의 키워드 파라미터 추출
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;

    const fetchKeywordNews = async () => {
      try {
        const res = await axios.get(`https://newsummarize.com/api/search`, {
          params: { keyword },
        });

        const data = res.data.map((news) => ({
          title: news.title,
          summary: news.content || "본문 요약 정보가 없습니다.",
          imageUrl: news.imageUrl,
          press: news.publisher,
          time: news.publishedAt,
        }));

        setArticles(data);
      } catch (err) {
        console.error("키워드 뉴스 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywordNews();
  }, [keyword]);

  return (
    <div className="keyword-page">
      <main className="keyword-content keyword-grid-layout">
        <div className="left-column">
          <KeywordNews articles={articles} title={`"${keyword}" 관련 뉴스 📰`} />
        </div>
        <div className="right-column">
          <Traffic />
          <AISummary />
        </div>
      </main>
    </div>
  );
}

export default Keyword;
