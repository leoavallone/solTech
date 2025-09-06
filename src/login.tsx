import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import "./login.css";
=======
import { useAuth } from "./context/AuthContext";
import "./Login.css";
import { ISignInData } from "./interfaces/sign.interfaces";
import { useForm } from "react-hook-form";
>>>>>>> e9b852c (Subindo tela de detalhes da estacao de carregamento)

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const navigate = useNavigate();
  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (event: any) => {
    // Impede que a página seja recarregada
    event.preventDefault();
    // Faz o console log das credenciais do usuário
    console.log("Dados de Login:", { username, password });
    navigate("/dashboard");
  };
=======
  const [load, setLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Ocorreu um erro ao executar a operação, contate o suporte');
  const { user, signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Função que é chamada quando o formulário é enviado
  const handleSignIn = async (data: ISignInData) => {
    setLoad(true);
    const loginAction = await signIn(data);
    if (!loginAction) {
      setLoad(false);
      setMessage("Usuário ou senha inválidos");
      setOpen(true);
    }
    setLoad(false);
  }
>>>>>>> e9b852c (Subindo tela de detalhes da estacao de carregamento)

  return (
    <div className="bgAuth">
      <div className="container">
        <form onSubmit={handleSubmit((data: any) => { handleSignIn(data) })}>
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
<<<<<<< HEAD
          <button type="submit">Login</button>
          {/* <div className="signup-link">
=======
          <button type="submit" onClick={() => handleSubmit}>Login</button>
          <div className="signup-link">
>>>>>>> e9b852c (Subindo tela de detalhes da estacao de carregamento)
            <p>
              Não tem uma conta? <a href="#">Registar</a>{" "}
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
