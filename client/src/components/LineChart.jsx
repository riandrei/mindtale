import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Assesment Score Over Time",
};

export default function App({ chartData }) {
  console.log(chartData);
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
