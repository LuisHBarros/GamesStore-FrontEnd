import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useApi } from '../../hooks/useApi';
import { User } from '../../types/User';



    export default function ResetPassword(){

        const navigate = useNavigate()
        const api = useApi()

        const schema = yup.object({
            email: yup.string().email('Email invalido').required('Campo obrigatório'),
            PasswordResetToken: yup.string().required('Campo obrigatório'),
            password: yup.string().required('Campo obrigatório'),
            confirmPassword: yup.string().label('confirm password').required('Campo obrigatório').oneOf([yup.ref('password'), null], 'Senhas divergentes'),
          })
          const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({resolver: yupResolver(schema)});

          async function onSubmit(user: User){
            const response : string| number|undefined = await api.resetPassword(user)
            console.log(response)
            if(response === 201){
                alert('Senha alterada com sucesso!')
                navigate('/login')
            }
            if(response === 404){
                alert('Email não registrado')
            }
            if(response === 401){
                alert('Código inválido ou inspirado')
            }
            if(response === 500){
                alert("Erro no servidor! tente novamente mais tarde")
            }
          }

          return(
            <div className='text-center py-5 font-semibold'>
                <h1 className='text-2xl'>Resetar senha</h1>
                <form className='py-3' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                            <p className='pt-6'>Email</p>
                            <input type='email' className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-1/4' {...register("email")}>
                            </input>
                            {<span>{errors.email?.message}</span>}
                        </label>
                    <label>
                            <p className='pt-6'>Codigo de recuperacao</p>
                            <input className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-1/4' {...register("PasswordResetToken")}>
                            </input>
                            {<span>{errors.PasswordResetToken?.message}</span>}
                        </label>
                    <label>
                            <p className='pt-6'>Senha</p>
                            <input type='password' className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-1/4' {...register("password")}>
                            </input>
                            {<span>{errors.password?.message}</span>}
                        </label>
                    <label>
                            <p className='pt-6'>Confirma senha</p>
                            <input type='password' className='focus:bg-green-300 focus:border-[1px] rounded focus:border-slate-800 border-slate-600 border-[1px] p-3 text-sm w-1/4' {...register("confirmPassword")}>
                            </input>
                            {<span>{errors.confirmPassword?.message}</span>}
                        </label>
                        <button type="submit" className=' rounded m-5 border-[1px] p-2 border-gray-600 cursor-pointer hover:bg-green-400 hover:px-10 transition-all duration-500'>Enviar</button>
                </form>
            </div>
          )
    }