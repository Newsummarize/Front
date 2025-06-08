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

  // 날짜별로 그룹화하는 함수
  const groupByDate = (events) => {
    return events.reduce((acc, event) => {
      const dateKey = new Date(event.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    }, {});
  };

  // 시간만 포맷
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const grouped = groupByDate(events);

  return (
    <div className="aisummary">
      <h2>타임라인 🪄</h2>
      <div className="aisummary-scroll">
        {events.length === 0 ? (
          <p style={{ marginLeft: '12px', marginTop: '6px' }}>
            타임라인 데이터를 불러오는 중입니다.
          </p>
        ) : (
          <div className="timeline-vertical">
            {Object.entries(grouped).map(([date, eventsOnDate]) => (
              <div key={date} className="timeline-day-group">
                <div className="timeline-date-row">
                  <div className="dot" />
                  <div className="timeline-date">{date}</div>
                </div>
                {eventsOnDate.map((event) => (
                  <div className="timeline-item" key={event.id}>
                    <div className="timeline-content">
                      <div className="timeline-time">{formatTime(event.publishedAt)}</div>
                      <div className="timeline-title">{event.title}</div>
                      <div className="timeline-text">{event.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AISummary;
