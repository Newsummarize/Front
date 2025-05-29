import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/aisummary.css";

function AISummary() {
  const [events, setEvents] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    if (!keyword) return;

    axios
      .get("https://newsummarize.com/api/search/timeline", {
        params: { keyword },
      })
      .then((res) => {
        const sorted = res.data.events.sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
        setEvents(sorted);
      })
      .catch((err) => {
        console.error("타임라인 불러오기 실패:", err);
      });
  }, [keyword]);

  // 날짜+시간 포맷 함수
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dateStr} ${timeStr}`;
  };

  return (
    <div className="aisummary">
      <h2>타임라인 🪄</h2>
      <div className="timeline-vertical">
        {events.length === 0 ? (
          <p>요약된 뉴스 정보가 여기에 표시됩니다.</p>
        ) : (
          events.map((event) => (
            <div className="timeline-item" key={event.id}>
              <div className="dot" />
              <div className="timeline-content">
                <div className="timeline-date">{formatDateTime(event.publishedAt)}</div>
                <div className="timeline-title">{event.title}</div>
                <div className="timeline-text">{event.content}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AISummary;
