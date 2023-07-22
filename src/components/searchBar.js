import React, { useState, useEffect } from "react";
import theme from "../Theme/theme";
import { InputBase, ThemeProvider } from "@mui/material";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // const results = getSearchResult();
  };

  const handleSearch = () => {
    // onSearch(query);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // 완료 눌렀을 때 실행될 동작
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <InputBase
          placeholder="찾으시는 건물명을 입력해주세요."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </ThemeProvider>
  );
};

export default SearchBar;
