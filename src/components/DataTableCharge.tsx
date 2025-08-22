import React, { useState } from "react";

const DataTableCharge = (chargeData: any) => {
  const itemsPerPage = 10; // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular o total de páginas
  const totalPages = Math.ceil(chargeData.length / itemsPerPage);

  // Paginar os dados
  const paginatedData = chargeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome da Estação</th>
            <th>Descrição</th>
            <th>Tipo de Conector</th>
            <th>Modo de Operação</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.label ?? "Null"}</td>
              <td>{row.chargerdescription ?? "Null"}</td>
              <td>{row.typedescription ?? "Null"}</td>
              <td>{row.modedescription ?? "Null"}</td>
              <td>{row.serialNumber ?? "Null"}</td>
              <td>{row.statecode ?? "Null"}</td>
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

export default DataTableCharge;
