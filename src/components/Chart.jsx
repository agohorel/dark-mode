import React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const Chart = ({ sparklineData, darkMode }) => {
  const formattedData = sparklineData
    .map((price, idx) => {
      if (idx % 6 === 0) {
        const timeToSubtract = 168 - idx;
        const date = moment()
          .subtract(timeToSubtract, "hours")
          .format("ddd h:mma");
        return { value: price, date };
      } else if (idx === sparklineData.length - 1) {
        const date = moment().format("ddd h:mma");
        return { value: price, date };
      }
      return null;
    })
    .filter(data => data);

  const strokeColor = darkMode ? "#fff" : "#8884d8";
  const gridColor = darkMode ? "#aaa" : "#ccc";
  const tooltipStyles = darkMode ? { color: "white" } : { color: "black" };
  const tooltipContentStyles = darkMode
    ? { backgroundColor: "#3c3c3c" }
    : { backgroundColor: "#eee" };

  return (
    <LineChart width={1100} height={300} data={formattedData}>
      <Line type="natural" dataKey="value" stroke={strokeColor}/>
      <CartesianGrid stroke={gridColor} strokeDasharray="5 5" />
      <XAxis dataKey="date" interval={3} />
      <YAxis />
      <Tooltip itemStyle={tooltipStyles} contentStyle={tooltipContentStyles} />
    </LineChart>
  );
};

export default Chart;
