import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Most Popular Tags",
};

export default function App({ chartData }) {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
