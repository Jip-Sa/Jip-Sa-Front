import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../Theme/theme";
import "./circularGauge.css"; // CSS 파일을 불러옵니다.

const CircularGauge = ({ percent, place }) => {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState(theme.colors.level1);
  useEffect(() => {
    // percent 값에 따라 애니메이션을 위해 progress 값을 증가시킵니다.

    if (percent <= 80) {
      setColor(theme.colors.level1);
    } else if (percent > 80 && percent <= 90) {
      setColor(theme.colors.level2);
    } else if (percent > 90 && percent <= 100) {
      setColor(theme.colors.level3);
    } else {
      setColor(theme.colors.level4);
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, percent));
    }, 20);
    console.log(theme.colors.level3);
    return () => clearInterval(interval);
  }, [percent, place]);

  return (
    <div className="gauge-container">
      <svg className="gauge">
        <circle className="gauge-circle-bg" cx="70" cy="70" r="60" />
        <circle
          className="gauge-circle"
          cx="70"
          cy="70"
          r="60"
          style={{
            stroke: color,
            strokeDasharray: 377, // 전체 둘레인 377을 설정합니다.
            strokeDashoffset:
              progress >= 100 ? 0 : 377 - (377 * progress) / 100, // strokeDashoffset 애니메이션을 설정합니다.
          }}
        />
        <text className="gauge-text" x="70" y="70" style={{ fill: color }}>
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default CircularGauge;
