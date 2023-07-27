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
  const [SizePercentMap, setSizePercentMap] = useState([]);

  // ------
  const panelHeight = "55vh";

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
    setSelectedSize("All");
    const tradeSizeUrl = `http://172.10.5.130:80/jipsa/api/v1/sizeTrade?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;
    axios
      .get(tradeSizeUrl)
      .then((response) => {
        const sortedArr = Array.from(response.data.size)
          .map((str) => Number(str))
          .sort((a, b) => a - b);
        setTradeSizes(sortedArr);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });

    const rentSizeUrl = `http://172.10.5.130:80/jipsa/api/v1/sizeRent?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;
    axios
      .get(rentSizeUrl)
      .then((response) => {
        const sortedArr = Array.from(response.data.size)
          .map((str) => Number(str))
          .sort((a, b) => a - b);
        setRentSizes(sortedArr);
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

    //TODO: percent 처리하기
    // const percentUrl = `http://172.10.5.130:80/jipsa/api/v1/percent!!!!!!!!?gu=${props.gu}&dong=${props.dong}&jibun=${props.jibun}`;
    // axios
    //   .get(percentUrl)
    //   .then((response) => {
    //     setSizePercentMap(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("데이터를 불러오는 데 실패했습니다:", error);
    //   });
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
    for (const item of SizePercentMap) {
      if (item.size === selectedSize) {
        setRisk(item.percent);
      }
    }
    if (selectedSize === "All") {
      setSelectedSizeTradeInfos(tradeInfos);
      setSelectedSizeRentInfos(rentInfos);
      setSelectedSizeAllInfos(allInfos);
    } else {
      const newTradeInfos = [];
      for (const tradeData of tradeInfos) {
        if (tradeData.size == selectedSize) {
          newTradeInfos.push(tradeData);
        }
      }
      setSelectedSizeTradeInfos(newTradeInfos);

      const newRentInfos = [];
      for (const rentData of rentInfos) {
        if (rentData.size == selectedSize) {
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
            sx={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              borderBottom: "2px",
              borderBottomColor: "#BDBDBD",
            }}
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
          <Typography
            variant="button"
            gutterBottom
            sx={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              fontSize: "20px",
            }}
          >
            위험도
          </Typography>
          <div>
            <CircularGauge percent={risk} place={placeName} />
          </div>
        </div>

        <div className="contract-info-container">
          <Typography
            variant="button"
            gutterBottom
            sx={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              marginTop: "10px",
              marginBottom: "15px",
              fontSize: "13px",
              color: "#BDBDBD",
            }}
          >
            본 위험도는 가장 최근 매매, 전세 거래 기준으로 계산되었습니다.
          </Typography>
          <Separator></Separator>
          <Typography
            variant="button"
            gutterBottom
            sx={{
              fontFamily: "Nanum Gothic",
              fontWeight: 800,
              marginRight: "auto",
              marginLeft: "10px",
              marginTop: "15px",
            }}
          >
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
