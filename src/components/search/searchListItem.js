import React, { useState, useEffect } from "react";
import theme from "../../Theme/theme";
import PlaceIcon from "@mui/icons-material/Place";
import { ThemeProvider } from "@mui/material";
import "./searchListItem.css"; // 외부 CSS 파일을 import

const SearchListItem = (props) => {
  // const { level, address, group, place, road_address, phone, place_url, x, y } =
  const data = props.searchData;

  var color;
  if (data.level === 1) {
    color = "success";
  }
  useEffect(() => {
    console.log(`This is Data place : ${data.place}`);
    // console.log(`This is name : ${data.place}, address : ${data.address}`);
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      {props.isFirst && <div className="separator" />}
      <div
        className="search-list-container"
        style={{
          borderRadius: props.isLast ? "0 0 10px 10px" : "0",
        }}
      >
        <PlaceIcon color={color} sx={{ flex: 1 }} />
        <div className="info-container">
          <p className="location-name">{data.place}</p>
          <p className="location-address">{data.address}</p>
          <p className="location-address">{data.group}</p>
        </div>
      </div>
      {!props.isLast && <div className="separator" />}
    </ThemeProvider>
  );
};

export default SearchListItem;
