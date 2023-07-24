import React, { useState } from "react";
import MapComponent from "../components/map/mapComponent";
import SearchBar from "../components/search/searchBar";
import "./mainPage.css"; // 외부 CSS 파일을 import

class SearchData {
  constructor(level, name, address) {
    this.level = 1;
    this.name = name;
    this.address = address;
  }
}

const MainPage = () => {
  const [searchResult, setSearchResult] = useState([
    new SearchData(1, "태평소", "대전 유성구 뭐시기"),
    new SearchData(1, "카이스트", "대전 유성구 뭐시기"),
    new SearchData(1, "N1", "대전 유성구 뭐시기"),
    new SearchData(1, "몰입캠프", "대전 유성구 뭐시기"),
    new SearchData(1, "우리집", "청주 상당구 뭐시기"),
  ]);
  const [query, setQuery] = useState("");
  const handleSearch = (results) => {
    setQuery(results);
  };
  return (
    <div className="main-page-container">
      <MapComponent location={query} />
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} searchResults={searchResult} />
      </div>
    </div>
  );
};

export default MainPage;
