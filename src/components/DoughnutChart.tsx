// import React from "react"
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Doughnut } from "react-chartjs-2";

// import sourceData from "../data/sourceData.json";
// export const DoughnutChart = (dataChargesTransactions: any) => {

//   const groupedData = Object.values(
//     dataChargesTransactions.data.reduce((acc, { reason }) => {
//         if (!acc[reason]) {
//             acc[reason] = { reason, count: 0 };
//         }
//         acc[reason].count++;
//         return acc;
//     }, {})
//   );

//   console.log(groupedData);
//   return (
//         <Doughnut
//           data={{
//             labels: groupedData.map((data) => data.reason),
//             datasets: [
//               {
//                 label: "Count",
//                 data: groupedData.map((data) => data.count),
//                 backgroundColor: [
//                   "#ffcd56",
//                   "#FF6384",
//                   "#4BC0C0",
//                   "#FF9F40",
//                   "#9966FF",
//                   "#36A2EB",
//                   "#FFB9FF",
//                   '#FF55BB',
//                   "#7cffff",
//                   "#7C3D00"
//                 ],
//                 borderColor: [
//                   "#ffcd56",
//                   "#FF6384",
//                   "#4BC0C0",
//                   "#FF9F40",
//                   "#9966FF",
//                   "#36A2EB",
//                   "#FFB9FF",
//                   '#FF55BB',
//                   "#7cffff",
//                   "#7C3D00"
//                 ],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Ocorrências de consumo por status",
//               },
//             },
//           }}
//         />
//   )
// }
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
