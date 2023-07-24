import React, { useState } from "react";
import MapComponent from "../components/map/mapComponent";
import SearchBar from "../components/search/searchBar";
import "./mainPage.css"; // 외부 CSS 파일을 import

const MainPage = () => {
  const [query, setQuery] = useState("강남구 청담동 91-2");
  const handleSearch = (results) => {
    setQuery(results);
  };
  return (
    <div className="main-page-container">
      <MapComponent location={query} />
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default MainPage;
