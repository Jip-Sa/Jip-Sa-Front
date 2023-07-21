import React, { useState } from "react";
import MapComponent from "../components/map/mapComponent";
import SearchBar from "../components/map/searchBar";

const MainPage = () => {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (query) => {
    // 검색 요청 처리 로직
    // 예를 들어, 네이버 지도 API를 사용하여 검색 결과를 가져올 수 있습니다.
    // setSearchResult를 통해 검색 결과를 저장합니다.
    console.log(`This is Query : ${query}`);
    setSearchResult(query);
  };
  return (
    <div>
      <h1>Map Page</h1>
      <SearchBar onSearch={handleSearch} />
      <MapComponent location={searchResult} />
    </div>
  );
};

export default MainPage;
