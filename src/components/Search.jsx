import React from "react";
import '../styles/search.css';

function Search() {
    return (
        <div className="header-search">
            <input type="text" placeholder="Keyword 검색" />
            <button className="search-button">🔍</button>
        </div>
    );
}

export default Search;
