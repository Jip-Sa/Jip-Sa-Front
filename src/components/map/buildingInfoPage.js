// Building Info Page
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
import Typography from "@mui/material/Typography";
import CircularGauge from "../circularGauge";
import Separator from "../separator";
import "./buildingInfoPage.css"; // 외부 CSS 파일을 import

const BuildingInfoPage = (props) => {
  const [address, setAddress] = useState("서울시 강남구 대치동 1");
  const [placeName, setPlaceName] = useState("");
  const [tradeInfos, setTradeInfos] = useState([]);
  const [rentInfos, setRentInfos] = useState([]);

  useEffect(() => {
    setPlaceName(props.placeName);
    setAddress(props.address);
  }, [props]);

  useEffect(() => {
    // const url =
    //   "http://172.10.5.130:80/jipsa/api/v1/tradeInfo?gu=강남구&dong=대치동&jibun=";
  }, [address]);
  return (
    <div className="building-info-container">
      <Typography variant="h6" gutterBottom>
        {placeName}
      </Typography>
      <Typography variant="button" gutterBottom>
        위험도
      </Typography>
      <CircularGauge percent={75} />
      <Separator></Separator>
    </div>
  );
};

export default BuildingInfoPage;
