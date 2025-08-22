import React, { useState } from "react";
import "./css/DataTableCharge.css";

const DataTableCharge = (data: any) => {
  const itemsPerPage = 10; // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular o total de páginas
  const totalPages = Math.ceil(data.chargeData.length / itemsPerPage);

  // Paginar os dados
  const paginatedData = data.chargeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Estação</th>
            <th>Tipo</th>
            <th>Cliente</th>
            <th>Fornecedor</th>
            <th>Modelo</th>
            <th>Serial</th>
            <th>Online</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.label ?? "Null"}</td>
              <td>{row.typename ?? "Null"}</td>
              <td>{row.clientname ?? "Null"}</td>
              <td>{row.vendor ?? "Null"}</td>
              <td>{row.modelname ?? "Null"}</td>
              <td>{row.serialnumber ?? "Null"}</td>
              <td>{(row.connected) ? "Sim" : "Não"}</td>
              <td>{row.connectionupdate ?? "Null"}</td>
              <td>{row.statelabel ?? "Null"}</td>
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

export default DataTableCharge;
