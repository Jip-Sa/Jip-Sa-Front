import React, { useState, useEffect } from "react";
import theme from "../Theme/theme";
import { InputBase, ThemeProvider } from "@mui/material";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const url = "https://openapi.naver.com/v1/search/local"; // 요청을 보낼 URL
    const query = "검색어"; // 원하는 검색어를 설정합니다.

    const params = new URLSearchParams({ query: query });

    const headers = new Headers();
    headers.append("X-Naver-Client-Id", ""); // 본인의 Naver API 클라이언트 아이디를 넣어주세요.
    headers.append("X-Naver-Client-Secret", ""); // 본인의 Naver API 클라이언트 시크릿을 넣어주세요.

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`${url}?${params}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 서버로부터 받은 응답을 처리하는 로직
        console.log(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error("Error:", error.message);
      });
    // if (query.trim() !== "") {
    //   // 검색어가 비어있지 않은 경우에만 검색 요청 보내기
    //   axios
    //     .get(`https://openapi.naver.com/v1/search/local?query=${query}`, {
    //       headers,
    //     })
    //     .then((response) => {
    //       setSearchResults(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } else {
    //   setSearchResults([]);
    // }
  }, [query]);

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
