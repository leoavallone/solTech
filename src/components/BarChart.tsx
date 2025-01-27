import React from "react"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import sourceData from "../data/sourceData.json";
export const BarChart = () => {
  return (
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "green",
                  "blue",
                  "#FF3030",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Consumo por carregamento",
              },
            },
          }}
        />
    )
}