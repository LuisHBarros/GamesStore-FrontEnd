import { yupResolver } from "@hookform/resolvers/yup"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth/AuthContext"
import { User } from "../../types/User"
import * as yup from 'yup';

export function Login(){

    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const schema = yup.object({
        email: yup.string().email('Email invalido').required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
      })
      const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({resolver: yupResolver(schema)});

    async function handleLogin(user: User){

        if(user.email && user.password){
            const isLogged = await auth.signin(user.email, user.password)
            if(isLogged){
                navigate('/');
            } else{
                alert("Email ou senha incorretos")
            }
        }
    }
    return(
        <div className='py-5 font-semibold flex flex-row justify-center items-center w-[100vw] h-[100vh]'>
            <div className=' text-center border-[2px] w-[52rem] h-[32rem] '>
                
                <h2 className=' text-2xl font-bold p-5'>Pagina Fechada</h2>
                <h3 className='text-xl font-semibold'>Para acessar, faça o login</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                <label>
                        <p className='pt-6'>Email</p>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-2 text-sm w-2/4' {...register("email")}>
                        </input>
                        {<span>{errors.email?.message}</span>}
                    </label>
                <label>
                        <p className='pt-6'>Senha</p>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-2 text-sm w-2/4'type='password'  {...register("password")}>
                        </input>
                        {<span>{errors.password?.message}</span>}
                    </label>
                    <button type="submit" className=' rounded m-5 border-[1px] p-2 border-gray-600 cursor-pointer hover:bg-green-400 hover:px-10 transition-all duration-500'>Enviar</button>
            </form>
                <span className='block pt-10 text-lg font-semibold'>Ainda não possui um cadastro? <Link to='/register' className=' transition-all duration-500 hover:text-green-500 hover:cursor-pointer hover:text-xl'>Clique aqui</Link></span>
                <span className='block text-lg font-semibold '>Esqueceu sua senha? <Link to='/recovery' className= ' transition-all duration-500 hover:text-green-500 hover:cursor-pointer hover:text-xl'>Clique aqui</Link></span>
            </div>
        </div>
    )
}