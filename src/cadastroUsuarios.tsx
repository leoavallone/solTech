import { useState } from "react";
import {
    FaInstagram,
    FaWhatsapp
} from "react-icons/fa";
import "./cadastroUsuarios.css";
import Logo from './assets/2btech-logo.png'
import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUpData } from "./interfaces/signup.interfaces";
import SoulTechServices from "./services/solTech-services";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

type Inputs = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

const CadastroUsuarios = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [load, setLoad] = useState<boolean>(false);
    const handleShowPassword = (flag: boolean) => !flag;

    const signUp = async (data: ISignUpData) => {
        try {
            console.log(data);
            setLoad(true);
            const response = await SoulTechServices.signUp(data);
            if (response && response.data) {
                toast.success("Cadastro Realizado com Sucesso!", {
                    onClose: (reason?: boolean | string) => navigate("/login")
                });
                setLoad(false);
                reset();
            }
        } catch (error) {
            setLoad(false);
            console.log(error);
        }
    }

    return (
        <div className="cadastroContainer">
            <img src={Logo} className="cadastroLogo" />
            <div className="cadastroContainerRow">
                <div className="leftSection">
                <h1 className="cadastroTitle">Criar Conta</h1>
                    <div>
                        <form onSubmit={handleSubmit((data: any) => { signUp(data) })}>
                            <div className="cadastroInputSection">
                                <input
                                    type="text"
                                    required
                                    placeholder="Nome:"
                                    {...register("name", { required: true })}
                                    className={errors.name ? "cadastroInput hasError" : "cadastroInput"}
                                />
                            </div>

                            <div className="cadastroInputSection">
                                <input
                                    type="text"
                                    required
                                    placeholder="E-mail:"
                                    {...register("email", { required: true })}
                                    className={errors.email ? "cadastroInput hasError" : "cadastroInput"}
                                />
                            </div>

                            <div className="cadastroInputSection">
                                <input
                                    type="text"
                                    required
                                    placeholder="CPF: "
                                    {...register("cpf", { required: true })}
                                    className={errors.cpf ? "cadastroInput hasError" : "cadastroInput"}
                                />
                            </div>

                            <div className="cadastroInputSection">
                                <input
                                    type="text"
                                    required
                                    placeholder="Telefone:"
                                    {...register("phone", { required: true })}
                                    className={errors.phone ? "cadastroInput hasError" : "cadastroInput"}
                                />
                            </div>

                            <div className="cadastroInputSection">
                                <input
                                    type="password"
                                    placeholder="Senha:"
                                    {...register("password", { required: true })}
                                    className={errors.password ? "cadastroInput hasError" : "cadastroInput"}
                                />
                            </div>

                            <div className="cadastroInputSection">
                                <input
                                    type="password"
                                    placeholder="Confirmar senha:"
                                    {...register("confirmPassword", { required: true })}
                                    className={errors.confirmPassword ? "cadastroInput hasError" : "cadastroInput"}
                                />
                            </div>

                            <button
                                type="submit" 
                                onClick={() => handleSubmit} 
                                disabled={load}
                                className="cadastroButton"
                            >
                            {load ? 'AGUARDE...' : 'CADASTRAR'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="rightSection">
                    <h2 className="cadastroSubTitle">
                        Bem vindo a<br />2BCharge
                    </h2>

                    <p className="cadastroText">
                        Já possui um acesso?<br /> Entre pelo link abaixo.
                    </p>

                    <button 
                        onClick={() => navigate("/login")}
                        className="cadastroButtonSecoundary"
                    >
                        LOGIN
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

export default CadastroUsuarios;
