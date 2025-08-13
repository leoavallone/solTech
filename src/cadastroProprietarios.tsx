import React, { useMemo, useState } from "react";
import "./cadastroProprietarios.css";

export type Proprietario = { id: string; nome: string };
export type Carregador = { id: string; nome: string };
export type Vinculo = {
  id: string;
  proprietarioId: string;
  proprietarioNome: string;
  carregadorId: string;
  carregadorNome: string;
};

type Props = {
  initialProprietarios?: Proprietario[];
  initialCarregadores?: Carregador[];
  initialVinculos?: Vinculo[];
};

export default function CadastroProprietarios({
  initialProprietarios,
  initialCarregadores,
  initialVinculos,
}: Props) {
  const [proprietarios] = useState<Proprietario[]>(
    initialProprietarios ?? [
      { id: "1", nome: "Leonardo" },
      { id: "2", nome: "Lenadro" },
      { id: "3", nome: "Danielle" },
    ]
  );

  const [carregadores] = useState<Carregador[]>(
    initialCarregadores ?? [
      { id: "A", nome: "Estação A" },
      { id: "B", nome: "Estação B" },
      { id: "C", nome: "Estação C" },
    ]
  );

  const [vinculos, setVinculos] = useState<Vinculo[]>(
    initialVinculos ?? [
      {
        id: "1-A",
        proprietarioId: "1",
        proprietarioNome: "Leonardo",
        carregadorId: "A",
        carregadorNome: "Estação A",
      },
      {
        id: "2-B",
        proprietarioId: "2",
        proprietarioNome: "Lenadro",
        carregadorId: "B",
        carregadorNome: "Estação B",
      },
      {
        id: "3-C",
        proprietarioId: "3",
        proprietarioNome: "Danielle",
        carregadorId: "C",
        carregadorNome: "Estação C",
      },
    ]
  );

  const [propSel, setPropSel] = useState("");
  const [cargSel, setCargSel] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const podeVincular = useMemo(
    () => !!propSel && !!cargSel && !submitting,
    [propSel, cargSel, submitting]
  );

  function handleVincular() {
    if (!podeVincular) return;
    setSubmitting(true);

    const jaExiste = vinculos.some(
      (v) => v.proprietarioId === propSel && v.carregadorId === cargSel
    );
    if (jaExiste) {
      setSubmitting(false);
      return;
    }

    const novo: Vinculo = {
      id: `${propSel}-${cargSel}`,
      proprietarioId: propSel,
      proprietarioNome:
        proprietarios.find((p) => p.id === propSel)?.nome || "",
      carregadorId: cargSel,
      carregadorNome:
        carregadores.find((c) => c.id === cargSel)?.nome || "",
    };

    setVinculos((prev) => [novo, ...prev]);
    setPropSel("");
    setCargSel("");
    setSubmitting(false);
  }

  function handleDesvincular(v: Vinculo) {
    setVinculos((prev) => prev.filter((x) => x.id !== v.id));
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Vincular Proprietário à Estação</h2>

        <div className="form">
          <div className="form-group">
            <label>Proprietário:</label>
            <select
              value={propSel}
              onChange={(e) => setPropSel(e.target.value)}
            >
              <option value="">Selecione um proprietário</option>
              {proprietarios.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Carregador:</label>
            <select
              value={cargSel}
              onChange={(e) => setCargSel(e.target.value)}
            >
              <option value="">Selecione um carregador</option>
              {carregadores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-primary"
            onClick={handleVincular}
            disabled={!podeVincular}
          >
            Vincular
          </button>
        </div>

        <h3 className="section-title">Vínculos Existentes</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Proprietário</th>
                <th>Carregador</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {vinculos.length === 0 && (
                <tr>
                  <td colSpan={3}>Nenhum vínculo encontrado</td>
                </tr>
              )}
              {vinculos.map((v) => (
                <tr key={v.id}>
                  <td>{v.proprietarioNome}</td>
                  <td>{v.carregadorNome}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDesvincular(v)}
                    >
                      Desvincular
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
