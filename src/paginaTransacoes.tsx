import React, { useMemo, useState } from "react";
import "./paginaTransacoes.css";

export type Transaction = {
  chargePoint: string;
  client: string;
  transactionId: string;
  reservationId: string;
  invoice: string;
  service: string;
  tariff: string;
  currency: string;
  price: string;
};

const MOCK: Transaction[] = [
  {
    chargePoint: "18446744073709561015\n1",
    client: "demo\ndemo",
    transactionId: "7157",
    reservationId: "—",
    invoice: "03ed411627e5e325",
    service: "Waiting (min)",
    tariff: "Waiting tariff (min.)",
    currency: "USD (USD)\nU.S. dollar.",
    price: "0",
  },
  {
    chargePoint: "18446744073709561015\n1",
    client: "demo\ndemo",
    transactionId: "7157",
    reservationId: "—",
    invoice: "03ed411627e5e325",
    service: "Suspended (min)",
    tariff: "Suspended tariff (min.)",
    currency: "USD (USD)\nU.S. dollar.",
    price: "0",
  },
  {
    chargePoint: "18446744073709561015\n1",
    client: "demo\ndemo",
    transactionId: "7157",
    reservationId: "—",
    invoice: "03ed411627e5e325",
    service: "Charging (kWh)",
    tariff: "Charging tariff (kWh)",
    currency: "USD (USD)\nU.S. dollar.",
    price: "0",
  },
];

type SortKey = keyof Transaction;

function Th({
  label,
  onClick,
  active,
  dir,
  isNumeric,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  dir?: "asc" | "desc";
  isNumeric?: boolean;
}) {
  const ariaSort: "ascending" | "descending" | "none" =
    active ? (dir === "asc" ? "ascending" : "descending") : "none";

  return (
    <th
      onClick={onClick}
      className={`tx-th ${active ? "is-active" : ""} ${isNumeric ? "is-numeric" : ""}`}
      aria-sort={ariaSort}
      scope="col"
      title="Ordenar"
    >
      {label}
    </th>
  );
}

export default function PaginaTransacoes() {
  const [rows] = useState<Transaction[]>(MOCK);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("transactionId");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? rows.filter((r) =>
          Object.values(r).some((v) => String(v).toLowerCase().includes(q))
        )
      : rows.slice();
    base.sort((a, b) => {
      const va = String(a[sortKey] ?? "");
      const vb = String(b[sortKey] ?? "");
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return base;
  }, [rows, query, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="tx-page">
      <div className="tx-header">
        <h1 className="tx-title">Transactions</h1>
        <input
          className="tx-search"
          placeholder="Search transactions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search transactions"
        />
      </div>

      <div className="tx-table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              <Th label="Charge Point"    onClick={() => handleSort("chargePoint")}   active={sortKey === "chargePoint"}   dir={sortDir} />
              <Th label="Client"          onClick={() => handleSort("client")}        active={sortKey === "client"}        dir={sortDir} />
              <Th label="TransactionId"   onClick={() => handleSort("transactionId")} active={sortKey === "transactionId"} dir={sortDir} />
              <Th label="ReservationId"   onClick={() => handleSort("reservationId")} active={sortKey === "reservationId"} dir={sortDir} />
              <Th label="Invoice"         onClick={() => handleSort("invoice")}       active={sortKey === "invoice"}       dir={sortDir} />
              <Th label="Service"         onClick={() => handleSort("service")}       active={sortKey === "service"}       dir={sortDir} />
              <Th label="Tariff"          onClick={() => handleSort("tariff")}        active={sortKey === "tariff"}        dir={sortDir} />
              <Th label="Currency"        onClick={() => handleSort("currency")}      active={sortKey === "currency"}      dir={sortDir} />
              <Th label="Price"           onClick={() => handleSort("price")}         active={sortKey === "price"}         dir={sortDir} isNumeric />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={`${r.transactionId}-${i}`}>
                <td>
                  <a className="tx-link" href="#" onClick={(e) => e.preventDefault()}>
                    {r.chargePoint.split("\n")[0]}
                  </a>
                  <div className="tx-sub">{r.chargePoint.split("\n")[1]}</div>
                </td>
                <td>
                  <a className="tx-link" href="#" onClick={(e) => e.preventDefault()}>
                    {r.client.split("\n")[0]}
                  </a>
                  <div className="tx-sub">{r.client.split("\n")[1]}</div>
                </td>
                <td>{r.transactionId}</td>
                <td className="tx-center">{r.reservationId || "—"}</td>
                <td>{r.invoice}</td>
                <td>{r.service}</td>
                <td>{r.tariff}</td>
                <td>
                  {r.currency.split("\n")[0]}
                  <div className="tx-sub">{r.currency.split("\n")[1]}</div>
                </td>
                <td className="tx-num">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}