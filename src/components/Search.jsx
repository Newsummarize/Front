import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../styles/search.css";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.pathname.startsWith("/keyword/")
    ? decodeURIComponent(location.pathname.split("/keyword/")[1])
    : "";

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (params) {
      setKeyword(params); // URL에서 받아온 검색어로 세팅
    }
  }, [params]);

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/keyword/${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="header-search">
      <input
        type="text"
        placeholder="Keyword 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button className="search-button" onClick={handleSearch}>🔍</button>
    </div>
  );
}

export default Search;
