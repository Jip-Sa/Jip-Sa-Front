// Building Info Page
import React, { useEffect, useState } from "react";
import theme from "../../Theme/theme";
import axios from "axios";
import { ThemeProvider, Box, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularGauge from "../circularGauge";
import Separator from "../separator";
import ContractItem from "./contractItem";
import "./buildingInfoPage.css"; // 외부 CSS 파일을 import
import { borderBottom } from "@mui/system";

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
  const [placeName, setPlaceName] = useState("");
  const [tradeInfos, setTradeInfos] = useState([]);
  const [rentInfos, setRentInfos] = useState([]);
  const [allInfos, setAllInfos] = useState([]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setPlaceName(props.placeName);
    setGu(props.gu);
    setDong(props.dong);
    setJibun(props.jibun);
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
        console.log(`----------This is trade datas---------`);
        console.log(tradeDatas);
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
        console.log(`-----------This is Lent datas------`);
        console.log(rentDatas);
        setRentInfos(rentDatas.reverse());
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });
  }, [props]);

  useEffect(() => {
    setAllInfos(sortInfos(rentInfos, tradeInfos));
  }, [tradeInfos, rentInfos]);

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
          <Typography variant="h6" gutterBottom>
            {placeName}
          </Typography>
        </div>
        <Separator></Separator>
        <div className="level-container">
          <Typography variant="button" gutterBottom>
            위험도
          </Typography>
          <div>
            <CircularGauge percent={75} />
          </div>
        </div>
        <Separator></Separator>
        <div className="contract-info-container">
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
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                  centered
                >
                  <Tab label="전체" value="1" />
                  <Tab label="매매" value="2" />
                  <Tab label="전/월세" value="3" />
                </TabList>
              </Box>
              <div style={{ height: "50vh", overflowY: "scroll" }}>
                <TabPanel value="1">
                  <div>
                    {allInfos.map((item, index) => (
                      <ContractItem
                        key={index}
                        contractData={item}
                        isLast={index === allInfos.length - 1}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  {tradeInfos.map((item, index) => (
                    <ContractItem
                      key={index}
                      contractData={item}
                      isLast={index === tradeInfos.length - 1}
                    />
                  ))}
                </TabPanel>
                <TabPanel value="3">
                  {rentInfos.map((item, index) => (
                    <ContractItem
                      key={index}
                      contractData={item}
                      isLast={index === rentInfos.length - 1}
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
