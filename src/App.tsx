import "./App.css";
import CadastroUsuarios from "./cadastroUsuarios";
import { Dashboard } from "./dashboard";
import Login from "./login";
import CadastroProprietarios from "./cadastroProprietarios";

export const App = () => {
  return (
    <div className="App">
      <CadastroUsuarios />
    </div>
  );
}

