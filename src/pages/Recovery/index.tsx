import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { User } from '../../types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import { application } from 'express';
import { useApi } from '../../hooks/useApi';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Register(){


    const navigate = useNavigate()
    const api = useApi()
    
    async function onSubmit(data: User){
        const results = await api.recovery(data)
        if (results){
            alert("Estamos enviando um email com instruções para a redefinição da sua senha. (Válido por 30min)")
            navigate('/')
            
        }
        else if(results === undefined){
            alert('Email não cadastrado!')
        }
        else{
            alert("Falha no sistema! tente novamente mais tarde")
        }
    }


    const schema = yup.object({
        email: yup.string().email('Email invalido').required('Campo obrigatório')
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({resolver: yupResolver(schema)});

    return(
        <div className=' py-5 font-semibold flex flex-row justify-center items-center w-[100vw] h-[100vh]'>
            <div className='text-center border-[2px] w-[52rem] h-[32rem]'>
                <h1 className=' pt-20 font-medium'>Esqueceu sua senha? Sem problemas!</h1>
                <h2 className='py-5'>Digite seu email entraremos em contato com voce para a redefinicao</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='py-20'>
                    <label>
                        <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-1/2' placeholder='Email' {...register("email")}>
                        </input>
                        {<span>{errors.email?.message}</span>}
                    </label>
                    <button type="submit" className=' my-[4rem] rounded m-5 border-[1px] p-2 border-gray-600 cursor-pointer hover:bg-green-400 transition-all hover:px-10 duration-500'>Enviar</button>
                </form>
            </div>
        </div>
    )
}