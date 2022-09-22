import { useForm } from "react-hook-form";
import { User } from "../../types/User";
import * as yup from 'yup';
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { AuthProvider } from "../../contexts/AuthProvider";


export default function Register(){

    
    const navigate = useNavigate()
    const api = useApi()
    const auth = useContext(AuthContext)

    const schema = yup.object({
        email: yup.string().email('Email invalido').required('Campo obrigatório'),
        name: yup.string().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
        confirmPassword: yup.string().label('confirm password').required('Campo obrigatório').oneOf([yup.ref('password'), null], 'Senhas divergentes'),
      })
      const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({resolver: yupResolver(schema)});

      async function onSubmit(user: User){
            const { name, email, password} = user
            if(email && password){
                const isLogged = await auth.register(name!, email!, password!)
                if(isLogged){
                    navigate('/');
                } else{
                    alert("email ja registrado")
                }
            }
        }

    return(
        <div className=' py-5 font-semibold flex flex-row justify-center items-center w-[100vw] h-[100vh]'>
        <div className=' text-center border-[2px] w-[52rem] h-[35rem] '>
        <h1 className='text-2xl py-3 font-bold'>Criar conta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                        <p className='pt-6'>Nome do usuario</p>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-2/4' {...register("name")}>
                        </input>
                        {<span>{errors.name?.message}</span>}
                    </label>
                <label>
                        <p className='pt-6'>Email</p>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-2/4' {...register("email")}>
                        </input>
                        {<span>{errors.email?.message}</span>}
                    </label>
                <label>
                        <p className='pt-6'>Senha</p>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-2/4'type='password'  {...register("password")}>
                        </input>
                        {<span>{errors.password?.message}</span>}
                    </label>
                <label>
                        <p className='pt-6'>Confirma senha</p>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-2/4'type='password'  {...register("confirmPassword")}>
                        </input>
                        {<span>{errors.confirmPassword?.message}</span>}
                    </label>
                    <button type="submit" className=' rounded m-5 border-[1px] p-2 border-gray-600 cursor-pointer hover:bg-green-400 hover:px-10 transition-all duration-500'>Enviar</button>
            </form>
        </div>
    </div>
    )
}