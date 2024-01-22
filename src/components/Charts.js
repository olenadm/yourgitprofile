import React, { useState, useEffect } from "react";
//import { langColors } from "../utils";
import buildChart from "./utils/buildChart";

export default function Charts({ langData, repoData }) {
  const [langChartData, setLangChartData] = useState(null);

  // Create chart with langData
  const initLangChart = () => {
    const ctx = document.getElementById("langChart");
    const labels = langData.map((lang) => lang.label);
    const data = langData.map((lang) => lang.value);

    setLangChartData(data);

    if (data.length > 0) {
      const backgroundColor = langData.map(
        ({ color }) =>
          `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`
      );
      const borderColor = langData.map((lang) => `${lang.color}`);
      const chartType = "pie";
      const axes = false;
      const legend = true;
      const config = {
        ctx,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
      };
      buildChart(config);
    }
  };

  useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
    }
  }, []);

  const langChartError = !(langChartData && langChartData.length > 0);
  const chartSize = 300;

  return (
    <div>
      <div className="chart-container">
        {langChartError && <p>Nothing to see here!</p>}
        <canvas id="langChart" width={chartSize} height={chartSize} />
      </div>
    </div>
  );
}
