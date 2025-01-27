import React from "react"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";


import revenueData from "../data/revenueData.json";
export const LineChart = () => {
  return (
        <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "green",
                borderColor: "green",
              },
              {
                label: "Cost",
                data: revenueData.map((data) => data.cost),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Estações Ativas",
              },
            },
          }}
        />
        )
}