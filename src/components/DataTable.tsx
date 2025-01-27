import React from 'react';
const DataTable = () => {
    const data = [
      { date: '2018-11-16T09:48:39.000Z', consumption: 0.0 },
      { date: '2018-11-16T09:49:00.000Z', consumption: 52.1 },
      // Adicione os dados aqui
    ];
  
    return (
      <table>
        <thead>
          <tr>
            <th>Data da Transação</th>
            <th>Consumo</th>
            <th>Contexto</th>
            <th>Formato</th>
            <th>Atividade</th>
            <th>Localização</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.consumption}</td>
              <td>Sample.Periodic</td>
              <td>Raw</td>
              <td>Energy.Active.Import.Register</td>
              <td>Outlet</td>
              <td>Wh</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default DataTable;
  