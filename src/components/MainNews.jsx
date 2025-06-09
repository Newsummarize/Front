import '../styles/mainnews.css';

function formatDate(datetimeStr) {
  if (!datetimeStr) return '';
  const [date, time] = datetimeStr.split('T');
  const hhmm = time?.slice(0, 5);
  return `${date} ${hhmm}`;
}

function MainNews({ articles, title }) {
  return (
    <div className="mainnews">
      <h2>{title}</h2>
      <ul className="news-list">
        {articles.map((news, idx) => (
          <li
            key={idx}
            className="news-item horizontal"
            onClick={() => window.open(news.url, "_blank")}
          >
            <img
              src={news.imageUrl || '/src/assets/default.png'}
              alt="뉴스 썸네일"
              className="news-thumbnail horizontal"
            />
            <div className="news-content">
              <div>
                <p className="news-title">{news.title}</p>
                <p className="news-summary">{news.summary}</p>
              </div>
              <p className="news-meta">{news.press} · {formatDate(news.time)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainNews;
