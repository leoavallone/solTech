import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from './assets/2btech-logo.png'
import { ISignInData } from "./interfaces/sign.interfaces";
import { useForm } from "react-hook-form";

const Login = () => {
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
    <div className="loginContainer">
      <img src={Logo} className="loginLogo" />
      <div className="loginContainerRow">
        <div className="leftSection">
          <h1 className="loginTitle">Entrar</h1>
          <div>
          <form onSubmit={handleSubmit((data: any) => { handleSignIn() })}>
            <div className="loginInputSection">
              <input
                type="text"
                placeholder="E-mail:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="loginInput"
              />
            </div>

            <div className="loginInputSection">
              <input
                type="password"
                placeholder="Senha:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="loginInput"
              />
            </div>

            <div className="loginLinkSection">
              <a className="loginLink" href="#">
                Esqueceu sua senha?
              </a>
            </div>

            <button
              type="submit" 
              onClick={() => handleSubmit} 
              disabled={load}
              className="loginButton"
            >
              {load ? 'AGUARDE...' : 'ENTRAR'}
            </button>
          </form>
          </div>
        </div>

        <div className="rightSection">
          <h2 className="loginSubTitle">
            Bem vindo a<br />2BCharge
          </h2>

          <p className="loginText">
            Insira seus dados e comece sua mensurar<br /> suas recargas conosco!
          </p>

          <button 
            onClick={() => console.log('Criar conta')}
            className="loginButtonSecoundary"
          >
            CRIAR CONTA
          </button>

          <div className="socialContainer">
            <a href="#" className="socialButton">
              <FaInstagram />
            </a>
            <a href="#" className="socialButton">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
