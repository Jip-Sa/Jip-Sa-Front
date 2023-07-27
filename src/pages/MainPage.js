import React, { useState } from "react";
import MapComponent from "../components/map/mapComponent";
import SearchBar from "../components/search/searchBar";
import jipsaLogo from "../icon/jipsaLogo.png";
import jipsaWhiteLogo from "../icon/logowithwhite.png";
import "./mainPage.css"; // 외부 CSS 파일을 import

const MainPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (results) => {
    console.log(`Result changed!!!!!!!!`);
    setSearchResults(results);
  };
  return (
    <div className="main-page-container">
      <div className="banner">
        <img src={jipsaLogo} alt="jipsa 로고" className="image-container" />
      </div>
      <MapComponent searchResults={searchResults} />
      <div className="search-bar-container">
        <SearchBar getSearchResults={handleSearch} />
      </div>
    </div>
  );
};

export default MainPage;
