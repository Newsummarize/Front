import '../styles/recommend.css';

function Recommend({ articles, title, isLoggedIn }) {
  return (
    <div className="recommend">
      <h2>{title}</h2>
      {isLoggedIn ? (
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
      ) : (
        <p className="no-recommend">추천 뉴스가 없습니다</p>
      )}
    </div>
  );
}

export default Recommend;
