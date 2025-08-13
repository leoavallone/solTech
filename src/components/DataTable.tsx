import React, { useState } from "react";

const DataTable = (transactionsData: any) => {
  const itemsPerPage = 10; // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular o total de páginas
  const totalPages = Math.ceil(transactionsData.data.length / itemsPerPage);

  // Paginar os dados
  const paginatedData = transactionsData.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Data da Transação</th>
            <th>Estação</th>
            <th>Consumo</th>
            <th>Tag</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.dateStart}</td>
              <td>{row.identity}</td>
              <td>{row.value ?? 0}</td>
              <td>{row.idTag}</td>
              <td>{row.serialNumber}</td>
              <td>{row.reason ?? "Null"}</td>
              <td>kWh</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginação */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default DataTable;
