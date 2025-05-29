import '../styles/keywordnews.css';

function formatDate(datetimeStr) {
  if (!datetimeStr) return '';
  const [date, time] = datetimeStr.split('T');
  const hhmm = time?.slice(0, 5);
  return `${date} ${hhmm}`;
}

function KeywordNews({ articles, title }) {
  return (
    <div className="keywordnews">
      <h2>{title}</h2>
      <ul className="keyword-news-list">
        {articles.map((news, idx) => (
          <li key={idx} className="keyword-news-item horizontal">
            <img
              src={news.imageUrl || '/src/assets/default.png'}
              alt="뉴스 썸네일"
              className="keyword-news-thumbnail horizontal"
            />
            <div className="keyword-news-content">
              <div>
                <p className="keyword-news-title">{news.title}</p>
                <p className="keyword-news-summary">{news.summary}</p>
              </div>
              <p className="keyword-news-meta">{news.press} · {formatDate(news.time)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordNews;
