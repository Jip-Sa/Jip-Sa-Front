// Building Info Page
import React, { useEffect, useState } from "react";
import theme from "../../Theme/theme";
import axios from "axios";
import {
  ThemeProvider,
  Box,
  Tab,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularGauge from "../circularGauge";
import Separator from "../separator";
import ContractItem from "./contractItem";
import "./buildingInfoPage.css"; // 외부 CSS 파일을 import
import { borderBottom } from "@mui/system";
import { PhotoSizeSelectActualOutlined } from "@mui/icons-material";

class ContractData {
  constructor(year, month, size, price, isTrade) {
    this.year = year;
    this.month = month;
    this.size = size;
    this.price = price;
    this.isTrade = isTrade;
  }
}

const BuildingInfoPage = (props) => {
  const [gu, setGu] = useState("");
  const [dong, setDong] = useState("");
  const [jibun, setJibun] = useState("");
  const [risk, setRisk] = useState(110);
  const [placeName, setPlaceName] = useState("");
  const [tradeInfos, setTradeInfos] = useState([]);
  const [rentInfos, setRentInfos] = useState([]);
  const [allInfos, setAllInfos] = useState([]);
  // -----
  const [tradeSizes, setTradeSizes] = useState([50, 54, 43.2]);
  const [rentSizes, setRentSizes] = useState([50, 54, 43.2]);
  const [sizes, setSizes] = useState([50, 54, 43.2]);
  const [value, setValue] = useState("1");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedSizeTradeInfos, setSelectedSizeTradeInfos] = useState([]);
  const [selectedSizeRentInfos, setSelectedSizeRentInfos] = useState([]);
  const [selectedSizeAllInfos, setSelectedSizeAllInfos] = useState([]);
  // ------
  const panelHeight = "60.9vh";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSizeChange = (e) => {
    console.log(e.target.value);
    setSelectedSize(e.target.value);
  };

  useEffect(() => {
    setPlaceName(props.placeName);
    setGu(props.gu);
    setDong(props.dong);
    setJibun(props.jibun);
    setRisk(props.risk);
    const tradeSizeUrl = `http://172.10.5.130:80/jipsa/api/v1/sizeTrade?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;

    axios
      .get(tradeSizeUrl)
      .then((response) => {
        setTradeSizes(Array.from(response.data.size));
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });

    const rentSizeUrl = `http://172.10.5.130:80/jipsa/api/v1/sizeRent?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;

    axios
      .get(rentSizeUrl)
      .then((response) => {
        setRentSizes(Array.from(response.data.size));
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });

    const tradeUrl = `http://172.10.5.130:80/jipsa/api/v1/tradeInfo?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;

    axios
      .get(tradeUrl)
      .then((response) => {
        const tradeDatas = [];
        for (const tradeData of response.data.officetel) {
          tradeDatas.push(
            new ContractData(
              tradeData.year,
              tradeData.month,
              tradeData.size,
              tradeData.tradePrice,
              true
            )
          );
        }
        setTradeInfos(tradeDatas.reverse());
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });

    const rentUrl = `http://172.10.5.130:80/jipsa/api/v1/rentInfo?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;

    axios
      .get(rentUrl)
      .then((response) => {
        const rentDatas = [];
        for (const rentData of response.data.officetel) {
          rentDatas.push(
            new ContractData(
              rentData.year,
              rentData.month,
              rentData.size,
              rentData.rentPrice,
              false
            )
          );
        }
        setRentInfos(rentDatas.reverse());
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });
  }, [props]);

  useEffect(() => {
    setAllInfos(sortInfos(rentInfos, tradeInfos));
  }, [tradeInfos, rentInfos]);

  // 전체 size의 종류를 계산해서 반환한다.(setSizes)
  useEffect(() => {
    const combinedArray = [...tradeSizes, ...rentSizes];

    // Set을 이용하여 중복 제거
    const uniqueSet = new Set(combinedArray);

    // 다시 배열로 변환
    setSizes(Array.from(uniqueSet));
  }, [tradeSizes, rentSizes]);

  useEffect(() => {
    if (selectedSize === "All") {
      setSelectedSizeTradeInfos(tradeInfos);
      setSelectedSizeRentInfos(rentInfos);
      setSelectedSizeAllInfos(allInfos);
    } else {
      const newTradeInfos = [];
      for (const tradeData of tradeInfos) {
        if (tradeData.size === selectedSize) {
          newTradeInfos.push(tradeData);
        }
      }
      setSelectedSizeTradeInfos(newTradeInfos);

      const newRentInfos = [];
      for (const rentData of rentInfos) {
        if (rentData.size === selectedSize) {
          newRentInfos.push(rentData);
        }
      }
      setSelectedSizeRentInfos(newRentInfos);
    }
  }, [selectedSize, allInfos, tradeInfos, rentInfos]);

  useEffect(() => {
    setSelectedSizeAllInfos(
      sortInfos(selectedSizeTradeInfos, selectedSizeRentInfos)
    );
  }, [selectedSizeTradeInfos, selectedSizeRentInfos]);

  const sortInfos = (arr1, arr2) => {
    const combinedArray = [...arr1, ...arr2];

    // year와 month를 기준으로 늦은 순으로 정렬
    combinedArray.sort((a, b) => {
      const yearA = parseInt(a.year);
      const monthA = parseInt(a.month);
      const yearB = parseInt(b.year);
      const monthB = parseInt(b.month);

      if (yearA !== yearB) {
        return yearB - yearA;
      } else {
        return monthB - monthA;
      }
    });

    return combinedArray;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="building-info-container">
        <div className="building-name">
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
          >
            {placeName}
          </Typography>
        </div>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            fontFamily: "Nanum Gothic",
            fontWeight: 800,
          }}
        >
          <InputLabel
            id="demo-simple-select-helper-label"
            sx={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
            }}
          >
            Size
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedSize}
            label="size"
            onChange={handleSizeChange}
            sx={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
            }}
          >
            <MenuItem value="All">
              <em
                style={{
                  fontFamily: "Nanum Gothic",
                  fontWeight: 800,
                }}
              >
                All
              </em>
            </MenuItem>
            {sizes.map((item, index) => (
              <MenuItem
                value={item}
                sx={{
                  fontFamily: "Nanum Gothic",
                  fontWeight: 300,
                }}
              >
                {item}m<sup>2</sup>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="level-container">
          <Separator></Separator>
          <Typography variant="button" gutterBottom>
            위험도
          </Typography>
          <div>
            <CircularGauge percent={risk} place={placeName} />
          </div>
        </div>

        <div className="contract-info-container">
          <Separator></Separator>
          <Typography variant="button" gutterBottom>
            최근 거래 내역
          </Typography>
          <Box
            sx={{
              width: "100%",
              typography: "body1",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                  centered
                >
                  <Tab
                    label="전체"
                    value="1"
                    sx={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
                  />
                  <Tab
                    label="매매"
                    value="2"
                    sx={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
                  />
                  <Tab
                    label="전세"
                    value="3"
                    sx={{ fontFamily: "Nanum Gothic", fontWeight: 800 }}
                  />
                </TabList>
              </Box>
              <div style={{ flex: 1, flexDirection: "column" }}>
                <TabPanel
                  value="1"
                  style={{
                    paddingBottom: 0,
                    height: panelHeight,
                    overflowY: "auto",
                  }}
                >
                  <div>
                    {selectedSizeAllInfos.map((item, index) => (
                      <ContractItem
                        key={index}
                        contractData={item}
                        isLast={index === selectedSizeAllInfos.length - 1}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel
                  value="2"
                  style={{
                    paddingBottom: 0,
                    height: panelHeight,
                    overflowY: "auto",
                  }}
                >
                  {selectedSizeTradeInfos.map((item, index) => (
                    <ContractItem
                      key={index}
                      contractData={item}
                      isLast={index === selectedSizeTradeInfos.length - 1}
                    />
                  ))}
                </TabPanel>
                <TabPanel
                  value="3"
                  style={{
                    paddingBottom: 0,
                    height: panelHeight,
                    overflowY: "auto",
                  }}
                >
                  {selectedSizeRentInfos.map((item, index) => (
                    <ContractItem
                      key={index}
                      contractData={item}
                      isLast={index === selectedSizeRentInfos.length - 1}
                    />
                  ))}
                </TabPanel>
              </div>
            </TabContext>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default BuildingInfoPage;
