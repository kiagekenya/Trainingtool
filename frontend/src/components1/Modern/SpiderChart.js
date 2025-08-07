import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SpiderChart = ({
  currentScores,
  projectedScores,
  supervisorScores,
  categories,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const data = {
      labels: categories,
      datasets: [
        {
          label: "Current Scores",
          data: categories.map((cat) => currentScores[cat] || 0),
          fill: true,
         backgroundColor: "rgba(156, 202, 13, 0.2)", // Keeping a distinct color for supervisorScores
                borderColor: "#9cca0d",
                pointBackgroundColor: "#9cca0d", // From old chart
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        },
        ...(projectedScores
          ? [
              {
                label: "Projected Scores",
                data: categories.map((cat) => projectedScores[cat] || 0),
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)", // From old chart
                borderColor: "rgba(255, 99, 132, 1)", // From old chart
                pointBackgroundColor: "rgba(255, 99, 132, 1)", // From old chart
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255, 99, 132, 1)",
              },
            ]
          : []),
        ...(supervisorScores
          ? [
              {
                label: "Supervisor Scores",
                data: categories.map((cat) => supervisorScores[cat] || 0),
                fill: true,

                 backgroundColor: "rgba(54, 162, 235, 0.4)", // From old chart
          borderColor: "rgba(54, 162, 235, 1)", // From old chart
          pointBackgroundColor: "rgba(54, 162, 235, 1)", // From old chart
                
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#9cca0d",
              },
            ]
          : []),
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false, // From old chart
      scales: {
        r: {
          min: 0, // From old chart
          max: 5, // From old chart
          ticks: {
            stepSize: 1, // From old chart
            backdropColor: "rgba(0, 0, 0, 0)", // From old chart
          },
          pointLabels: {
            font: {
              size: 14, // From old chart
              weight: "bold", // From old chart
              family: "'Gill Sans', Tahoma, Geneva, Verdana, sans-serif", // From old chart
            },
            color: "#333", // From old chart
          },
          angleLines: { display: true },
        },
      },
      plugins: {
        legend: {
          position: "top", // From old chart
          labels: {
            font: {
              size: 15, // From old chart
            },
          },
        },
        tooltip: { enabled: true },
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data,
      options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [currentScores, projectedScores, supervisorScores, categories]);

  return (
    <div className="chart" style={{ height: "500px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default SpiderChart;