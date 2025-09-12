import { useState } from "react";
import {
    FaUser,
    FaLock,
    FaEnvelope,
    FaAddressCard,
    FaPhone,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import "./cadastroUsuarios.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUpData } from "./interfaces/signup.interfaces";
import SoulTechServices from "./services/solTech-services";

type Inputs = {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
};

const CadastroUsuarios = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            nome: "",
            email: "",
            cpf: "",
            telefone: "",
            senha: "",
            confirmarSenha: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [load, setLoad] = useState<boolean>(false);
    const handleShowPassword = (flag: boolean) => !flag;

    const signUp = async (data: ISignUpData) => {
        try {
            console.log(data);
            setLoad(true);
            let response = await SoulTechServices.signUp(data);
            if (response && response.data) {
                setLoad(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bgNoAuth">
            <div className="container">
                <div className="card">
                    <form className="form" onSubmit={handleSubmit((data: any) => signUp(data))}>
                        <h2>Cadastrar Usuários</h2>

                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Nome"
                                {...register("nome", { required: true })}
                                className={errors.nome ? "hasError" : ""}
                            />
                            <FaUser style={{ fill: "#000" }} className="icon" />
                            {errors.nome && <span className="infoErro">O Nome é obrigatório</span>}
                        </div>

                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="E-mail"
                                {...register("email", { required: true })}
                                className={errors.email ? "hasError" : ""}
                            />
                            <FaEnvelope style={{ fill: "#000" }} className="icon" />
                            {errors.email && <span className="infoErro">O Email é obrigatório</span>}
                        </div>

                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="CPF"
                                {...register("cpf", { required: true })}
                                className={errors.cpf ? "hasError" : ""}
                            />
                            <FaAddressCard style={{ fill: "#000" }} className="icon" />
                            {errors.cpf && <span className="infoErro">O CPF é obrigatório</span>}
                        </div>

                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Telefone"
                                {...register("telefone", { required: true })}
                                className={errors.telefone ? "hasError" : ""}
                            />
                            <FaPhone style={{ fill: "#000" }} className="icon" />
                            {errors.telefone && <span className="infoErro">O telefone é obrigatório</span>}
                        </div>

                        <div className="input-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                {...register("senha", { required: true })}
                                className={errors.senha ? "hasError" : ""}
                            />
                            {showPassword ? (
                                <FaEye style={{ fill: "#000" }}
                                    className="icon"
                                    onClick={() => setShowPassword(handleShowPassword(showPassword))}
                                />
                            ) : (
                                <FaEyeSlash style={{ fill: "#000" }}
                                    className="icon"
                                    onClick={() => setShowPassword(handleShowPassword(showPassword))}
                                />
                            )}
                            {errors.senha && <span className="infoErro">A senha é obrigatória</span>}
                        </div>

                        <div className="input-field">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmar senha"
                                {...register("confirmarSenha", { required: true })}
                                className={errors.confirmarSenha ? "hasError" : ""}
                            />
                            {showConfirmPassword ? (
                                <FaEye style={{ fill: "#000" }}
                                    className="icon"
                                    onClick={() => setShowConfirmPassword(handleShowPassword(showConfirmPassword))}
                                />
                            ) : (
                                <FaEyeSlash style={{ fill: "#000" }}
                                    className="icon"
                                    onClick={() => setShowConfirmPassword(handleShowPassword(showConfirmPassword))}
                                />
                            )}
                            {errors.confirmarSenha && <span className="infoErro">Confirme sua senha</span>}
                        </div>

                        <button type="submit" onClick={() => handleSubmit} disabled={load}>{load ? 'Aguarde' : 'Cadastrar'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastroUsuarios;
