import React, { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import "./App.css";
import { LineChart } from "./components/LineChart";
import { BarChart } from "./components/BarChart";
import { DoughnutChart } from "./components/DoughnutChart";
import DataTable from "./components/DataTable";
import apiClient from "./services/api";
import { calTotal } from "./tools/calcs";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  const [chargePoints, setChargePoints] = useState([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [totalPerCharge, setTotalPerCharge] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function fetchTransactionData(identity: string): Promise<any> {
      try {
        const response = await apiClient.post('/CentralSystem/TransactionList', 
          { identity }, 
          {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiIDogImFjY291bnRzLm9jcHAtY3NzLmNvbSIsICJhdWQiIDogIndlYi1vY3BwLWNzcy5jb20iLCAic3ViIiA6ICIyZDRmNzQyYWZhMmIxODdkN2QyNjhjYmI4NDNhY2U1ODY0ZjkzODI2IiwgImlhdCIgOiAxNzM5NzkyMjY3LCAiZXhwIiA6IDE3Mzk3OTU4Njd9.J8hHC3CI5soCiLka8HCcoBRKeTdm5x8Cb8KK7GG0QkM'
            }
          }
        );

        if (response.data.TransactionList && response.data.TransactionList.length > 0) {
          return response.data.TransactionList;
        }
      } catch (error) {
        console.error(`Erro ao buscar transações para ${identity}:`, error);
      }

      return []; // Retorno seguro em caso de erro
    }

    async function fetchChargePoints() {
      try {
        const response = await apiClient.get('/CentralSystem/ChargePointList', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiIDogImFjY291bnRzLm9jcHAtY3NzLmNvbSIsICJhdWQiIDogIndlYi1vY3BwLWNzcy5jb20iLCAic3ViIiA6ICI1ZjJkNjg4ZjY1N2Q2ZjBmZjVjMjk5YmNmYWIzMThjZmZjYWJhMzBiIiwgImlhdCIgOiAxNzM4Njk5MDg4LCAiZXhwIiA6IDE3Mzg3MDI2ODh9.R9DZXn1FkURGDScyVGSx-nza2Q_BiWajf0r3NfjET3Y'
          }
        });

        if (response.data.ChargePointList && response.data.ChargePointList.length > 0) {
          setChargePoints(response.data.ChargePointList);

          // Criando um array de promessas
          const transactionPromises = response.data.ChargePointList.map((cpl: any) => 
            fetchTransactionData(cpl.Identity)
          );

          // Aguarde todas as requisições finalizarem antes de atualizar o estado
          const transactionsData = (await Promise.all(transactionPromises)).flat();
          setTransactions(transactionsData);
          console.log('Data: ', transactionsData);

          const summarizedTransactions = transactionsData.reduce((acc, transaction) => {
            const existingEntry = acc.find(entry => entry.identity === transaction.identity);
            
            if (existingEntry) {
              existingEntry.totalValue += transaction.value;
            } else {
              acc.push({
                identity: transaction.identity,
                totalValue: transaction.value
              });
            }
            
            return acc;
          }, []);
          
          //console.log(summarizedTransactions);
          setTotalPerCharge(summarizedTransactions);
          setLoad(false);
        }
      } catch (error) {
        console.error("Erro ao buscar charge points:", error);
      }
    }

    fetchChargePoints();
  }, []);

  return (
    <div className="App">
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
  );
};
