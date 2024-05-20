import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Score", "Total", { role: "style" }],
  ["", 0, ""], // RGB value
];

export default function App() {
  return (
    <div style={{backgroundColor:"#2395a5"}}>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data} chartBackgroundColor="#2395a5"/>
    </div>
  );
}
