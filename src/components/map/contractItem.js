import React, { useState, useEffect } from "react";
import theme from "../../Theme/theme";
import PlaceIcon from "@mui/icons-material/Place";
import { ThemeProvider } from "@mui/material";
import "./contractItem.css"; // 외부 CSS 파일을 import

const ContractItem = (props) => {
  // const { level, address, group, place, road_address, phone, place_url, x, y } =
  const data = props.contractData;
  const [kind, setKind] = useState("");
  useEffect(() => {
    if (data.isTrade) {
      setKind("매매");
    } else {
      setKind("전세");
    }
    if (data.price === undefined) {
      data.price = "?";
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <div className="contract-item-container">
        <div>{kind}</div>
        <div>
          {data.year}년 {data.month}월
        </div>
        <div>{data.price}만원</div>
        <div>
          {data.size}m<sup>2</sup>
        </div>
        {!props.isLast && <div className="separatora" />}
      </div>
    </ThemeProvider>
  );
};

export default ContractItem;
