import '../styles/recommend.css';

function Recommend({ articles, title }) {
  return (
    <div className="recommend">
      <h2>{title}</h2>
      <ul className="recommend-list">
        {articles.map((news, idx) => (
          <li key={idx} className="recommend-item">
            <img
              src={news.imageUrl || '/src/assets/default.png'}
              alt="추천 뉴스 썸네일"
              className="recommend-thumbnail"
            />
            <p className="recommend-title">{news.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommend;
