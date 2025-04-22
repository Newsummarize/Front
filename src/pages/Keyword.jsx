import React from "react";
import { useParams } from "react-router-dom"; // 🔹 검색어 가져오기
import Header from "../components/Header";
import KeywordNews from "../components/KeywordNews";
import AISummary from "../components/AISummary";
import Traffic from "../components/Traffic";
import "../styles/keyword.css";

const dummyArticles = [
  {
    title: "기사 헤드라인 1",
    summary: "기사 요약 내용입니다.",
    imageUrl: "",
    press: "언론사",
    time: "2025.04.22 13:00",
  },
  {
    title: "기사 헤드라인 2",
    summary: "기사 요약 내용입니다.",
    imageUrl: "",
    press: "언론사",
    time: "2025.04.22 14:00",
  },
  {
    title: "기사 헤드라인 3",
    summary: "기사 요약 내용입니다.",
    imageUrl: "",
    press: "언론사",
    time: "2025.04.22 15:00",
  },
];

function Keyword() {
  const { keyword } = useParams(); // 🔹 URL의 키워드 파라미터 추출

  return (
    <div className="keyword-page">
      <Header />
      <main className="keyword-content">
        <div className="keyword-container">
          {/* 좌측 뉴스 영역 */}
          <KeywordNews articles={dummyArticles} title={`"${keyword}" 연관 뉴스`} />

          {/* 우측 요약/트래픽 영역 */}
          <div className="keyword-side">
            <AISummary />
            <Traffic />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Keyword;
