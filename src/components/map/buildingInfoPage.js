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
  const [gu, setGu] = useState("강남구");
  const [dong, setDong] = useState("대치동");
  const [jibun, setJibun] = useState("1");
  const [placeName, setPlaceName] = useState("");
  const [tradeInfos, setTradeInfos] = useState([]);
  const [rentInfos, setRentInfos] = useState([]);

  useEffect(() => {
    setPlaceName(props.placeName);
    setGu(props.gu);
    setDong(props.dong);
    setJibun(props.jibun);
  }, [props]);

  useEffect(() => {
    // const url =
    //   "http://172.10.5.130:80/jipsa/api/v1/tradeInfo?gu=강남구&dong=대치동&jibun=";
  }, [props]);
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
