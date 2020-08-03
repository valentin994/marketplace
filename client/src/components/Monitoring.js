import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import "./monitoring.scss";

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const chartConfig = {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Resource usage %",
        data: [
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        fill: false,
        borderWidth: 1,
      },
      {
        label: "My Second dataset",
        fill: false,
        data: [
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt(),
        ],
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Some Random Title",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const Monitoring = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  //const updateDataset = (datasetIndex, newData) => {
  //  chartInstance.data.datasets[datasetIndex].data = newData;
  //  chartInstance.update();
  //};

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Monitoring;
