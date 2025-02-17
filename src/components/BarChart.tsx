import React from "react"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export const BarChart = (dataChargesTransactions: any) => {
  return (
        <Bar
          data={{
            labels:  dataChargesTransactions.data.map((data) => data.identity),
            datasets: [
              {
                label: "Consumo em R$",
                data:  dataChargesTransactions.data.map((data) => data.totalValue),
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
                text: "Consumo por estação de carregamento",
              },
            },
          }}
        />
    )
}