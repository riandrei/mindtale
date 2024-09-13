import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Assesment Score Over Time",
};

export default function App({ chartData }) {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData
        .slice(0, 1)
        .concat(chartData.slice(1, chartData.length + 1).toReversed())}
      options={options}
    />
  );
}
