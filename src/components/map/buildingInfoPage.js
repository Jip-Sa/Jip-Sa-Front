// Building Info Page
import React, { useEffect, useState } from "react";
import theme from "../../Theme/theme";
import axios from "axios";
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
  const [gu, setGu] = useState("");
  const [dong, setDong] = useState("");
  const [jibun, setJibun] = useState("");
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
    const url = `http://172.10.5.130:80/jipsa/api/v1/tradeInfo?gu=${gu}&dong=${dong}&jibun=${jibun}`;
    console.log(`This is Url : ${url}`);
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });
  }, [placeName, gu, dong, jibun]);
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
