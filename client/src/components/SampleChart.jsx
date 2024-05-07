import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silverr", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #2395a5"], // CSS-style declaration
];

export default function App() {
  return (
    <div style={{backgroundColor:"#2395a5"}}>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data} chartBackgroundColor="#2395a5"/>
    </div>
  );
}
