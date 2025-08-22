import React, { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import "./dashboard.css";
import { LineChart } from "./components/LineChart";
import { BarChart } from "./components/BarChart";
import { DoughnutChart } from "./components/DoughnutChart";
import DataTable from "./components/DataTable";
import apiClient, { loginClient } from "./services/api";
import { calTotal } from "./tools/calcs";
import DataTableCharge from "./components/DataTableCharge";

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

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiIDogImFjY291bnRzLm9jcHAtY3NzLmNvbSIsICJhdWQiIDogIndlYi1vY3BwLWNzcy5jb20iLCAic3ViIiA6ICIxYzQ3OTRkZjIzYjhkMzdiYzM0MzRhOGZjODE1NWM3YmYwN2QxNzg0IiwgImlhdCIgOiAxNzU1ODcwMTcwLCAiZXhwIiA6IDE3NTU4NzM3NzB9.W5Q2dBMSkhbw0srFhC0elY11y-Mf-lqhNaluioLq5KI';

  useEffect(() => {
    // async function auth(){
    //   const response = await loginClient.post('/oauth2/token', {
    //     grant_type: 'password',
    //     username: 'demo',
    //     password: 'demo',
    //   },
    //   {
    //     headers: {
    //       'Origin': 'https://cloud.ocpp-css.com',
    //       'Referer': 'https://cloud.ocpp-css.com/crm',
    //     },
    //   }
    // );

    //   console.log('Retorno: ', response.data);
    // }
    // async function fetchTransactionData(identity: string): Promise<any> {
    //   try {
    //     const response = await apiClient.get('/charge_point/transaction/list', 
    //       { identity }, 
    //       {
    //         headers: {
    //           'Authorization': token
    //         }
    //       }
    //     );

    //     if (response.data.TransactionList && response.data.TransactionList.length > 0) {
    //       return response.data.TransactionList;
    //     }
    //   } catch (error) {
    //     console.error(`Erro ao buscar transações para ${identity}:`, error);
    //   }

    //   return []; // Retorno seguro em caso de erro
    // }

    async function fetchChargePoints() {
      try {
        const response = await apiClient.get(`/charge_point/list`, {
          headers: {
            'Authorization': token
          }
        });
        if (response.data && response.data.length > 0) {
          setChargePoints(response.data);

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
          <div className="dataCard line">
            <LineChart />
          </div>
            {chargePoints.length > 0 && <DataTableCharge chargeData={chargePoints}/>}
          {!load &&
            <>
              <div className="twoColumns">
                <div className="dataCard doughnut">
                  <DoughnutChart data={transactions}/>
                </div>

                <div className="dataCard bar">
                  <BarChart data={totalPerCharge} />
                </div>
              </div>

              <div className="dataCard line">
                <LineChart />
              </div>

              <div className="dataCard dataTable">
                <DataTable data={transactions}/>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
