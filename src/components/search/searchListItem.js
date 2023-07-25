import React, { useState, useEffect } from "react";
import theme from "../../Theme/theme";
import PlaceIcon from "@mui/icons-material/Place";
import { ThemeProvider } from "@mui/material";
import greenImage from "../../icon/green_marker.png";
import yellowImage from "../../icon/yellow_marker.png";
import orangeImage from "../../icon/orange_marker.png";
import redImage from "../../icon/red_marker.png";
import "./searchListItem.css"; // 외부 CSS 파일을 import

const SearchListItem = (props) => {
  const [image, SetImage] = useState(greenImage);
  // const { level, address, group, place, road_address, phone, place_url, x, y } =
  const data = props.searchData;

  var color;
  if (data.level === 1) {
    color = "success";
  }
  useEffect(() => {
    // console.log(`This is Data place : ${data.place}`);
    // console.log(`This is name : ${data.place}, address : ${data.address}`);
    if (data.risk < 80) {
      SetImage(greenImage);
    } else if (data.risk >= 80 && data.risk <= 90) {
      SetImage(yellowImage);
    } else if (data.risk > 90 && data.risk <= 110) {
      SetImage(orangeImage);
    } else {
      SetImage(redImage);
    }
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
        <img src={greenImage} alt="no level" />
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
