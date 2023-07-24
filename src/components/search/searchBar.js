import React, { useState } from "react";
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

const SearchBar = ({ onSearch, searchResults }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // 완료 눌렀을 때 실행될 동작
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Box
          boxShadow={10}
          style={{
            borderRadius: "0 0 10px 10px",
          }}
        >
          <div className="search-container">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px 10px 0 0 ",
                padding: 8,
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
              />
            </div>
            {searchResults.map((item, index) => (
              <SearchListItem
                key={index}
                searchData={item}
                isFirst={index === 0}
                isLast={index === searchResults.length - 1}
              />
            ))}
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default SearchBar;
