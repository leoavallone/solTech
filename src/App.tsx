import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./App.css";

import revenueData from "./data/revenueData.json";
import sourceData from "./data/sourceData.json";
import { LineChart } from "./components/LineChart";
import { BarChart } from "./components/BarChart";
import { DoughnutChart } from "./components/DoughnutChart";
import DataTable from "./components/DataTable";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  return (
    <div className="App">
      <div className="twoColumns">

      <div className="dataCard doughnut">
        <DoughnutChart/>
    </div>

      <div className="dataCard bar">
          <BarChart/>
      </div>
    </div>
      
      <div className="dataCard line">
        <LineChart/>
      </div>

      <div className="dataCard dataTable">
        <DataTable/>
      </div>
    </div>
  );
};