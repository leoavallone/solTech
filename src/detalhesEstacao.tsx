import React from "react";
import { FaPlay, FaLock, FaPen, FaTrash } from "react-icons/fa";
import "./detalhesEstacao.css";

type Connector = {
  id: number;
  name: string;
  number: number;
  charger: string;
  speed: string;
  state: "Preparing" | "Unavailable" | "Available";
};

type Transaction = {
  id: number;
  code: string;
  connector: number;
  start: string;
  end: string;
  meterStart: number;
  meterEnd: number;
  reservation: string;
  reason: string;
};

const details = {
  Name: "EFACECQCTEST",
  Identity: "EFACECQCTEST",
  Type: "Public",
  Vendor: "uFace",
  Model: "QC54 Standard",
  Version: "6.3.6.e04_20211011",
  "Box serial": "02.596-019.B",
  Serial: "02.596-019.B",
  IMSI: "724061567351111",
  Network: "Private",
  Online: "No",
  Disconnected: "26/06/2026, 16:26:30",
  Updated: "14/02/2026, 18:26:46",
  Created: "22/05/2024, 09:19:18",
};

const connectors: Connector[] = [
  { id: 1, name: "Connector1-CHAdeMO", number: 1, charger: "CHAdeMO", speed: "Fast DC", state: "Preparing" },
  { id: 2, name: "Connector2-CCS", number: 2, charger: "CCS Combo2 (Type 2)", speed: "Fast DC", state: "Unavailable" },
  { id: 3, name: "Connector3-AC", number: 3, charger: "Type 2", speed: "Fast AC", state: "Unavailable" },
];

const transactions: Transaction[] = Array.from({ length: 10 }).map((_, i) => ({
  id: 7030 - i,
  code: "demo",
  connector: 1,
  start: i === 0 ? "21/03/2026 11:26:34" : i === 1 ? "21/03/2026 09:43:56" : "21/03/2026 09:41:56",
  end: i === 0 ? "29/03/2026 16:42:10" : "21/03/2026 11:32:48",
  meterStart: i === 0 ? 0 : 28760,
  meterEnd: i === 0 ? 0 : 28760,
  reservation: "",
  reason: "System",
}));

const stateClass = (s: Connector["state"]) => {
  if (s === "Preparing") return "badge badge-yellow";
  if (s === "Unavailable") return "badge badge-gray";
  return "badge badge-green";
};

const DetalhesEstacao: React.FC = () => {
  return (
    <div className="page">
      <div className="breadcrumb">
        <span className="muted">Stations</span>
        <span className="sep">›</span>
        <span className="strong">EFACECQCTEST</span>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-title">Details</div>
          <div className="card-body">
            <div className="kv-grid">
              {Object.entries(details).map(([k, v]) => (
                <div className="kv-item" key={k}>
                  <div className="kv-key">{k}</div>
                  <div className="kv-val">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <span className="badge badge-blue">Created</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Connectors</div>
          <div className="card-body">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th className="tl">Connector</th>
                    <th className="tl">Number</th>
                    <th className="tl">Charger</th>
                    <th className="tl">State</th>
                    <th className="tr">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connectors.map((c) => (
                    <tr key={c.id} className="hover">
                      <td className="tl strong">{c.name}</td>
                      <td className="tl">{c.number}</td>
                      <td className="tl">
                        <div>{c.charger}</div>
                        <div className="muted small">{c.speed}</div>
                      </td>
                      <td className="tl">
                        <span className={stateClass(c.state)}>{c.state}</span>
                      </td>
                      <td className="tr">
                        <div className="actions">
                          <button className="icon-btn" title="Start/Stop"><FaPlay /></button>
                          <button className="icon-btn" title="Lock"><FaLock /></button>
                          <button className="icon-btn" title="Edit"><FaPen /></button>
                          <button className="icon-btn" title="Delete"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid3">
        <div className="span2">
          <div className="card">
            <div className="card-body">
              <div className="tabs">
                <button className="tab active">Transactions</button>
                <button className="tab">Reservations</button>
                <button className="tab">OCPP Log</button>
              </div>

              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th className="tl">ID</th>
                      <th className="tl">Code</th>
                      <th className="tl">Connector</th>
                      <th className="tl">Start</th>
                      <th className="tl">End</th>
                      <th className="tl">Meter start</th>
                      <th className="tl">Meter end</th>
                      <th className="tl">Reservation</th>
                      <th className="tl">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover">
                        <td>{t.id}</td>
                        <td>{t.code}</td>
                        <td>{t.connector}</td>
                        <td className="nowrap">{t.start}</td>
                        <td className="nowrap">{t.end}</td>
                        <td>{t.meterStart}</td>
                        <td>{t.meterEnd}</td>
                        <td>{t.reservation}</td>
                        <td>{t.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <div className="pager">
                  <button className="btn">‹</button>
                  <button className="btn solid">1</button>
                  <button className="btn">2</button>
                  <button className="btn">3</button>
                  <button className="btn">4</button>
                  <button className="btn">5</button>
                  <span className="ellipsis">…</span>
                  <button className="btn">591</button>
                  <button className="btn">›</button>
                </div>
                <div className="page-size">
                  <select>
                    <option>10 / page</option>
                    <option>25 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Location</div>
          <div className="card-body">
            <div className="map-placeholder">
              <div className="map-text">
                <div className="caps">Map placeholder</div>
                <div className="mini">Plugue aqui seu componente de mapa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesEstacao;