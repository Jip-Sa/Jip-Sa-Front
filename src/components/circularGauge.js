import React, { useEffect, useState } from "react";
import "./circularGauge.css"; // CSS 파일을 불러옵니다.

const CircularGauge = ({ percent }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // percent 값에 따라 애니메이션을 위해 progress 값을 증가시킵니다.
    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, percent));
    }, 20);
    return () => clearInterval(interval);
  }, [percent]);

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
            strokeDasharray: 377, // 전체 둘레인 377을 설정합니다.
            strokeDashoffset: 377 - (377 * progress) / 100, // strokeDashoffset 애니메이션을 설정합니다.
          }}
        />
        <text className="gauge-text" x="70" y="70">
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default CircularGauge;
