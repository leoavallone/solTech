import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ISignInData } from "./interfaces/sign.interfaces";
import { useForm } from "react-hook-form";

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Ocorreu um erro ao executar a operação, contate o suporte');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Função que é chamada quando o formulário é enviado
  const handleSignIn = async () => {
    setLoad(true);
    const loginAction = await signIn({email: username, password: password});
    if (!loginAction) {
      setLoad(false);
      setMessage("Usuário ou senha inválidos");
      setOpen(true);
    }else{
      setLoad(false);
      navigate("/dashboard");
    }
  }

  return (
    <div className="bgAuth">
      <div className="container">
        <form onSubmit={handleSubmit((data: any) => { handleSignIn() })}>
          <h1>Acesse o sistema</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#">Esqueceu sua senha?</a>
          </div>
          <button type="submit" onClick={() => handleSubmit} disabled={load}>{load ? 'Aguarde' : 'Login'}</button>
          <div className="signup-link">
            <p>
              Não tem uma conta? <a href="#">Registar</a>{" "}
            </p>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default Login;
