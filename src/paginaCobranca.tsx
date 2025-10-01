import React, { useMemo, useState } from "react";
import "./paginaCobranca.css";

type InvoiceState = "Open" | "Closed" | "Pending" | "Failed";
type CurrencyCode = "USD" | "BRL" | "EUR";

type Invoice = {
  code: string;
  clientName: string;
  clientAlias?: string;
  currency: CurrencyCode;
  currencyLabel: string;
  amount: number;
  dateISO: string; // ISO 8601
  state: InvoiceState;
};

type SortKey = keyof Pick<Invoice, "code" | "clientName" | "currency" | "amount" | "dateISO" | "state">;
type SortDir = "asc" | "desc" | null;

const mockInvoices: Invoice[] = [
  {
    code: "a0bdb77a8b5eca62",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-09-09T19:52:30",
    state: "Closed",
  },
  {
    code: "c927bf871ea8bba7",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-09-09T15:03:58",
    state: "Closed",
  },
  {
    code: "f80b083cdf4395fd",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-09-09T15:01:25",
    state: "Closed",
  },
  {
    code: "03ed411627e5e235",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-08-01T11:03:35",
    state: "Closed",
  },
  {
    code: "5560ec772f4b1044",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-08-01T10:30:01",
    state: "Closed",
  },
  {
    code: "2175dadedf73f65f",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-08-01T05:30:20",
    state: "Closed",
  },
  {
    code: "93dce4009a1ece2c",
    clientName: "demo",
    clientAlias: "demo",
    currency: "USD",
    currencyLabel: "U.S. dollar",
    amount: 0,
    dateISO: "2025-07-22T11:27:23",
    state: "Closed",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = d.toLocaleDateString("pt-BR");
  const hh = d.toLocaleTimeString("pt-BR", { hour12: false });
  return `${dd} ${hh}`;
}

function currencyFull(code: CurrencyCode) {
  if (code === "USD") return "USD (USD)";
  if (code === "BRL") return "BRL (R$)";
  return "EUR (€)";
}

export default function PaginaCobranca() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("dateISO");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = mockInvoices.filter((inv) => {
      if (!q) return true;
      return (
        inv.code.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.currency.toLowerCase().includes(q) ||
        inv.state.toLowerCase().includes(q)
      );
    });

    if (sortDir) {
      arr = [...arr].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        let cmp = 0;

        if (sortKey === "amount") {
          cmp = (av as number) - (bv as number);
        } else if (sortKey === "dateISO") {
          cmp = new Date(av as string).getTime() - new Date(bv as string).getTime();
        } else {
          cmp = String(av).localeCompare(String(bv));
        }

        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return arr;
  }, [query, sortKey, sortDir]);

  const sortIndicator = (key: SortKey) => {
    if (key !== sortKey || !sortDir) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
    // (Uso de caracteres evita dependência de libs e mantém sem sombra)
  };

  return (
    <div className="cobranca-page">
      <header className="cobranca-header">
        <h1 className="cobranca-title">Invoice</h1>
        <div className="cobranca-actions">
          <input
            className="cobranca-search"
            placeholder="Buscar por código, cliente, moeda ou status…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-primary" onClick={() => alert("Nova cobrança")}>
            + Nova cobrança
          </button>
        </div>
      </header>

      <section className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => handleSort("code")}>
                  <span>Code</span> <span className="sort">{sortIndicator("code")}</span>
                </th>
                <th onClick={() => handleSort("clientName")}>
                  <span>Client</span> <span className="sort">{sortIndicator("clientName")}</span>
                </th>
                <th onClick={() => handleSort("currency")}>
                  <span>Currency</span> <span className="sort">{sortIndicator("currency")}</span>
                </th>
                <th className="ta-right" onClick={() => handleSort("amount")}>
                  <span>Amount</span> <span className="sort">{sortIndicator("amount")}</span>
                </th>
                <th onClick={() => handleSort("dateISO")}>
                  <span>Date</span> <span className="sort">{sortIndicator("dateISO")}</span>
                </th>
                <th onClick={() => handleSort("state")}>
                  <span>State</span> <span className="sort">{sortIndicator("state")}</span>
                </th>
                <th aria-label="Ações" />
              </tr>
            </thead>

            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.code}>
                  <td className="mono">{inv.code}</td>
                  <td>
                    <a className="link">{inv.clientName}</a>
                    <div className="muted">{inv.clientAlias ?? inv.clientName}</div>
                  </td>
                  <td>
                    <div className="muted-strong">{currencyFull(inv.currency)}</div>
                    <div className="muted">{inv.currencyLabel}</div>
                  </td>
                  <td className="ta-right">{inv.amount}</td>
                  <td>
                    <div className="muted-strong">{formatDate(inv.dateISO)}</div>
                  </td>
                  <td>
                    <span className={`pill pill--${inv.state.toLowerCase()}`}>{inv.state}</span>
                  </td>
                  <td className="row-actions">
                    <button className="icon-btn" title="Detalhes" onClick={() => alert(inv.code)}>
                      ⋯
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty">
                    Nenhuma cobrança encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="table-footer">
          <span>Total: {filtered.length}</span>
          <div className="footer-gap" />
          <button className="btn-ghost" onClick={() => alert("Anterior")}>Anterior</button>
          <button className="btn-ghost" onClick={() => alert("Próxima")}>Próxima</button>
        </footer>
      </section>
    </div>
  );
}