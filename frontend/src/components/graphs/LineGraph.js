import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      grid: {
        display: true,
      },
      ticks: {
        maxTicksLimit: 21,
        // count: 11,
        precision: 0,
      },
    },
    x: {
      ticks: {
        display: false,
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [
        -411, 715, 111, -845, -523, -742, -846, -1200,
        // { x: "2016-12-25", y: 20 },
        // { x: "2016-12-26", y: 20 },
        // { x: "2016-12-27", y: 20 },
        // { x: "2016-12-28", y: 20 },
        // { x: "2016-12-29", y: 20 },
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [
        -188,
        -348,
        2,
        45,
        -458,
        -930,
        -589,
        1200,
        { x: "2016-12-25", y: 20 },
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const LineGraph = () => {
  return <Line options={options} data={data} />;
};

export default LineGraph;
