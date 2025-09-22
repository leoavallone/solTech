// src/router.tsx (lazy)
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("./login"));
const Dashboard = React.lazy(() => import("./dashboard"));
const CadastroUsuarios = React.lazy(() => import("./cadastroUsuarios"));
const CadastroProprietarios = React.lazy(() => import("./cadastroProprietarios"));
const DetalhesEstacao = React.lazy(() => import("./detalhesEstacao"));
const PaginaNotificacao = React.lazy(() => import("./paginaNotificacao"));
const PaginaTransacoes = React.lazy(()=> import("./paginaTransacoes"))

const withSuspense = (el: JSX.Element) => (
  <React.Suspense fallback={<p>Carregando…</p>}>{el}</React.Suspense>
);

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(<Login />) },
  { path: "/login", element: withSuspense(<Login />) },
  { path: "/dashboard", element: withSuspense(<Dashboard />) },
  { path: "/cadastro/usuarios", element: withSuspense(<CadastroUsuarios />) },
  { path: "/cadastro/proprietarios", element: withSuspense(<CadastroProprietarios />) },
  { path: "/dashboard/estacoes", element: withSuspense(<DetalhesEstacao />) },
  { path: "/dashboard/notificacoes", element: withSuspense(<PaginaNotificacao />) },
  { path: "/dashboard/transacoes", element: withSuspense(<PaginaTransacoes />) },
  { path: "*", element: <h1 style={{padding:24}}>404 - Página não encontrada</h1> },
]);


