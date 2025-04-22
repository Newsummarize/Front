import '../styles/keywordnews.css';

function KeywordNews({ articles, title }) {
  return (
    <div className="keywordnews">
      <h2>{title}</h2>
      <ul className="news-list">
        {articles.map((news, idx) => (
          <li key={idx} className="news-item horizontal">
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
              <p className="news-meta">{news.press} · {news.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordNews;
