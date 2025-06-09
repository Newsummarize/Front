import '../styles/recommend.css';

function formatDate(datetimeStr) {
  if (!datetimeStr) return '';
  const [date, time] = datetimeStr.split('T');
  const hhmm = time?.slice(0, 5);
  return `${date} ${hhmm}`;
}

function Recommend({ articles, title, isLoggedIn }) {
  return (
    <div className="recommend">
      <h2>{title}</h2>
      {isLoggedIn ? (
        <ul className="recommend-list">
          {articles.map((news, idx) => (
            <li
              key={idx}
              className="recommend-item horizontal"
              onClick={() => window.open(news.url, "_blank")}
            >
              <img
                src={news.imageUrl || '/src/assets/default.png'}
                alt="추천 뉴스 썸네일"
                className="recommend-thumbnail horizontal"
              />
              <div className="recommend-content">
                <div>
                  <p className="recommend-title">{news.title}</p>
                  <p className="recommend-summary">{news.summary}</p>
                </div>
                <p className="recommend-meta">{news.press} · {formatDate(news.time)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recommend">로그인 시 추천 뉴스가 제공됩니다.</p>
      )}
    </div>
  );
}

export default Recommend;
