import './cadastroUsuarios.css'
import Trash from '../src/assets/icons8-lixeira.svg'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    nome: string
    email: string
    cpf: string
    telefone: string
    senha: string
    confirmarSenha: string
}

export const CadastroUsuarios = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    console.log(watch("nome"))
    let users: any = []

    async function getUsers() {

    }



    return (

        <div className='container'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Cadastro de Usuários</h1>
                <input {...register("nome", { required: true })} placeholder="Nome: " type="text" className={errors.nome ? 'hasError' : 'registerField'}/>
                {errors.nome && <span className='infoErro'>O Nome é obrigatório</span>}
                <input {...register("email", { required: true })} placeholder="Email: " type="text" className={errors.email ? 'hasError' : 'registerField'}/>
                {errors.email && <span className='infoErro'>O Email é obrigatório</span>}
                <input {...register("cpf", { required: true })} placeholder="CPF: " type="text" className={errors.cpf ? 'hasError' : 'registerField'}/>
                {errors.cpf && <span className='infoErro'>O CPF é obrigatório</span>}
                <input {...register("telefone", { required: true })} placeholder="Telefone: " type="text" className={errors.telefone ? 'hasError' : 'registerField'}/>
                {errors.telefone && <span className='infoErro'>O telefone é obrigatório</span>}
                <input {...register("senha", { required: true })} placeholder="Senha: " type="password" className={errors.senha ? 'hasError' : 'registerField'}/>
                {errors.senha && <span className='infoErro'>A senha é obrigatória</span>}
                <input {...register("confirmarSenha", { required: true })} placeholder="Confirmar senha: " type="password" className={errors.confirmarSenha ? 'hasError' : 'registerField'}/>
                {errors.confirmarSenha && <span className='infoErro'>Confirme sua senha</span>}
                <input type="submit" value="Cadastrar" />
            </form>

            {users.map((user: any) => (
                <div key={user.id} className='card'>
                    <div>
                        <p>Nome: {user.name} </p>
                        <p>Email: {user.email} </p>
                        <p>Cpf: {user.cpf}</p>
                        <p>Telefone: {user.telefone} </p>
                        <p>Senha: </p>
                        <p>Confirmar Senha: </p>
                    </div>
                    <button>
                        <img src={Trash} />
                    </button>
                </div>
            ))}


        </div>
    )
}