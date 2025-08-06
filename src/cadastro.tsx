import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaAddressCard, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import "./cadastro.css";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    nome: string
    email: string
    cpf: string
    telefone: string
    senha: string
    confirmarSenha: string
}

const Cadastro = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
        console.log(watch("nome"))
        let users: any = []
    // Estados para armazenar as entradas do usuário
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = (flag: boolean) => {
        return !flag
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Cadastrar Usuários</h1>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Nome"
                        {...register("nome", { required: true })}
                        className={errors.nome ? 'hasError' : 'registerField'}
                    />
                    <FaUser className="icon" />
                </div>
                {errors.nome && <span className='infoErro'>O Nome é obrigatório</span>}
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="E-mail"
                        {...register("email", { required: true })}
                        className={errors.email ? 'hasError' : 'registerField'}
                    />
                    <FaEnvelope className="icon" />
                </div>
                {errors.email && <span className='infoErro'>O Email é obrigatório</span>}
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="CPF"
                        {...register("cpf", { required: true })}
                        className={errors.cpf ? 'hasError' : 'registerField'}
                    />
                    <FaAddressCard className="icon" />
                </div>
                {errors.cpf && <span className='infoErro'>O CPF é obrigatório</span>}
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Telefone"
                        {...register("telefone", { required: true })}
                        className={errors.telefone ? 'hasError' : 'registerField'}
                    />
                    <FaPhone className="icon" />
                </div>
                {errors.telefone && <span className='infoErro'>O telefone é obrigatório</span>}
                <div className="input-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        {...register("senha", { required: true })}
                        className={errors.senha ? 'hasError' : 'registerField'}
                    />
                    {showPassword ? (
                        <FaEye className="icon" onClick={() => setShowPassword(handleShowPassword(showPassword))} />
                    ) : (
                        <FaEyeSlash className="icon" onClick={() => setShowPassword(handleShowPassword(showPassword))} />
                    )}
                </div>
                {errors.senha && <span className='infoErro'>A senha é obrigatória</span>}
                <div className="input-field">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirmar senha"
                        {...register("confirmarSenha", { required: true })}
                        className={errors.confirmarSenha ? 'hasError' : 'registerField'}
                    />
                    {showConfirmPassword ? (
                        <FaEye className="icon" onClick={() => setShowConfirmPassword(handleShowPassword(showConfirmPassword))} />
                    ) : (
                        <FaEyeSlash className="icon" onClick={() => setShowConfirmPassword(handleShowPassword(showConfirmPassword))} />
                    )}
                </div>
                {errors.confirmarSenha && <span className='infoErro'>Confirme sua senha</span>}
                <button type="submit">cadastro</button>
            </form>
        </div>
    );
};

export default Cadastro;
