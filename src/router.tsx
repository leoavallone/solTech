// src/router.tsx (lazy)
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

const Login = React.lazy(() => import("./login"));
const Dashboard = React.lazy(() => import("./dashboard"));
const CadastroUsuarios = React.lazy(() => import("./cadastroUsuarios"));
const CadastroProprietarios = React.lazy(() => import("./cadastroProprietarios"));

const withSuspense = (el: JSX.Element) => (
  <React.Suspense fallback={<p>Carregando…</p>}>{el}</React.Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard", element: withSuspense(<Dashboard />) },
      { path: "/cadastro/usuarios", element: withSuspense(<CadastroUsuarios />) },
      { path: "/cadastro/proprietarios", element: withSuspense(<CadastroProprietarios />) },
      { path: "*", element: <h1 style={{padding:24}}>404 - Página não encontrada</h1> },
    ],
  },
  // { path: "/", element: withSuspense(<Login />) },
  // { path: "/login", element: withSuspense(<Login />) },
  // { path: "/dashboard", element: withSuspense(<Dashboard />) },
  // { path: "/cadastro/usuarios", element: withSuspense(<CadastroUsuarios />) },
  // { path: "/cadastro/proprietarios", element: withSuspense(<CadastroProprietarios />) },
  // { path: "*", element: <h1 style={{padding:24}}>404 - Página não encontrada</h1> },
]);
