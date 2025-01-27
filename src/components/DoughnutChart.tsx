import React from "react"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import sourceData from "../data/sourceData.json";
export const DoughnutChart = () => {
  return (
        <Doughnut
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
                borderColor: [
                  "green",
                  "blue",
                  "#FF3030",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Sources",
              },
            },
          }}
        />
  )
}
