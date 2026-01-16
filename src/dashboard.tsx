import React, { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import "./dashboard.css";
import { LineChart } from "./components/LineChart";
import { BarChart } from "./components/BarChart";
import { DoughnutChart } from "./components/DoughnutChart";
import DataTable from "./components/DataTable";
import apiClient, { cloudOcpp } from "./services/api";
import { calTotal } from "./tools/calcs";
import DataTableCharge from "./components/DataTableCharge";
import { useAuth } from "./context/AuthContext";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Dashboard = () => {
  const [chargePoints, setChargePoints] = useState([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [totalPerCharge, setTotalPerCharge] = useState([]);
  const [load, setLoad] = useState(true);
  const { user } = useAuth();
  const token = user.access_ocpp_token;
  
  useEffect(() => {
    async function fetchChargePoints() {
      try {
        const response = await cloudOcpp.post(`/CentralSystem/ChargePointList`,'', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && response.data.length > 0) {
          setChargePoints(response.data);
          setLoad(false);
          // Criando um array de promessas
          // const transactionPromises = response.data.ChargePointList.map((cpl: any) => 
          //   fetchTransactionData(cpl.Identity)
          // );

          // Aguarde todas as requisições finalizarem antes de atualizar o estado
          // const transactionsData = (await Promise.all(transactionPromises)).flat();
          // setTransactions(transactionsData);
          // console.log('Data: ', transactionsData);

          // const summarizedTransactions = transactionsData.reduce((acc, transaction) => {
          //   const existingEntry = acc.find(entry => entry.identity === transaction.identity);
            
          //   if (existingEntry) {
          //     existingEntry.totalValue += transaction.value;
          //   } else {
          //     acc.push({
          //       identity: transaction.identity,
          //       totalValue: transaction.value
          //     });
          //   }
            
            //return acc;
          //}, []);
          
          //console.log(summarizedTransactions);
          //setTotalPerCharge(summarizedTransactions);
          //setLoad(false);
        }
      } catch (error) {
        console.error("Erro ao buscar charge points:", error);
      }
    }

    fetchChargePoints();
    //auth();
  }, []);

  return (
    <div className="bgNoAuth">
      <div className="container">
        <div className="card">
          
          {!load &&
            <>
              <div className="twoColumns">
                <div className="dataCard doughnut">
                  {/* <DoughnutChart data={transactions}/> */}
                  <DoughnutChart />
                </div>

                <div className="dataCard bar">
                  <LineChart />
                </div>
              </div>
              <div className="dataCard dataTable">
                {chargePoints.length > 0 && <DataTableCharge chargeData={chargePoints}/>}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
