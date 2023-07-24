import React, { useState } from "react";
import theme from "../../Theme/theme";
import PlaceIcon from "@mui/icons-material/Place";
import { ThemeProvider } from "@mui/material";
import "./searchListItem.css"; // 외부 CSS 파일을 import

const SearchListItem = (props) => {
  const { level, name, address } = props.searchData;
  const isLast = props.isLast;
  const isFirst = props.isFirst;
  var color;
  if (level === 1) {
    color = "success";
  }
  console.log(`This is name : ${name}, address : ${address}`);
  return (
    <ThemeProvider theme={theme}>
      {isFirst && <div className="separator" />}
      <div
        className="search-list-container"
        style={{
          borderRadius: isLast ? "0 0 10px 10px" : "0",
        }}
      >
        <PlaceIcon color={color} sx={{ flex: 1 }} />
        <div className="info-container">
          <p className="location-name">{name}</p>
          <p className="location-address">{address}</p>
        </div>
      </div>
      {!isLast && <div className="separator" />}
    </ThemeProvider>
  );
};

export default SearchListItem;
