import React, { useEffect, useState } from "react";
import theme from "../../Theme/theme";
import {
  InputBase,
  ThemeProvider,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchListItem from "./searchListItem";
import "./searchBar.css"; // 외부 CSS 파일을 import

class SearchData {
  constructor(
    level,
    address,
    group,
    place,
    road_address,
    phone,
    place_url,
    x,
    y
  ) {
    this.level = 1;
    this.address = address;
    this.group = group;
    this.place = place;
    this.road_address = road_address;
    this.phone = phone;
    this.place_url = place_url;
    this.x = x;
    this.y = y;
  }
}

const SearchBar = ({ getSearchResults }) => {
  const [query, setQuery] = useState("");
  const [placeObject, setPlaceObject] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [boxHeight, setBoxHeight] = useState("auto");

  useEffect(() => {
    window.kakao.maps.load(() => {
      const place = new window.kakao.maps.services.Places();
      setPlaceObject(place);
    });
  }, []);

  useEffect(() => {
    setBoxHeight(searchResults.length > 7 ? "70vh" : "auto");
  }, [searchResults]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = (e) => {
    searchByKeyword();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByKeyword();
    }
  };

  const searchByKeyword = () => {
    if (query !== `` && query !== null) {
      console.log(`Start Search With keyword : ${query}`);
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      const options = {
        size: 10,
      };
      placeObject.keywordSearch(query, placesSearchCB, options);
    } else {
      setSearchResults([]);
      getSearchResults([]);
    }
  };

  function placesSearchCB(data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {
      var searchDatas = [];
      // console.log(data);
      //TODO: for of로 바꾸고 여기서 level 가져오기
      data.forEach((item) => {
        const {
          address_name,
          category_group_name,
          place_name,
          road_address_name,
          phone,
          place_url,
          x,
          y,
        } = item;
        searchDatas.push(
          new SearchData(
            1,
            address_name,
            category_group_name,
            place_name,
            road_address_name,
            phone,
            place_url,
            x,
            y
          )
        );
      });
      console.log(`Search Complete : ${searchDatas}`);
      setSearchResults(searchDatas);
      getSearchResults(searchDatas);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        boxShadow={10}
        style={{
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <div className="container">
          <div className="search-container">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px 10px 0px 0px",
                padding: "1rem",
                width: "25rem",
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div
              className="search-result-container"
              style={{ height: boxHeight }}
            >
              {searchResults.map((item, index) => (
                <SearchListItem
                  key={index}
                  searchData={item}
                  isFirst={index === 0}
                  isLast={index === searchResults.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default SearchBar;
