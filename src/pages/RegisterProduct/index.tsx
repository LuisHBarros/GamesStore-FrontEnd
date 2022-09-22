import { useContext } from "react"
import { AuthContext } from "../../contexts/auth/AuthContext"
import { useForm } from 'react-hook-form'
import { Product } from '../../types/Product';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './styles.css'
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const api = useApi()

    const schema = yup.object({
        name: yup.string().required("Campo obrigatório!"),
        discount: yup.string(),
        tax: yup.string().required('Campo obrigatório!'),
        price: yup.string().required("Campo obrigatório!"),
        developer: yup.string().required("Campo obrigatório!"),
        dep: yup.string().required("Campo obrigatório!").min(3, "O departamento deve ter pelo menos 3 caracteres"),
        image1: yup.string().required("Campo obrigatório!"),
        image2: yup.string().required("Campo obrigatório!"),
        image3: yup.string().required("Campo obrigatório!"),
        video: yup.string().required("Campo obrigatório!"),
        description: yup.string().required("Campo obrigatório!").min(30, "A descrição deve ter ao menos 30 caracteres"),
        description2: yup.string(),
        title_description: yup.string().required("Campo obrigatório!").max(100, "O título pode ter, no máximo, 30 caracteres"),
        image_description: yup.string().required("Campo obrigatório!"),
        platform: yup.string().nullable().required("Campo obrigatório!"),
        stock: yup.string().nullable().required("Campo obrigatório!"),
    })

    const navigate = useNavigate()
    
    const auth = useContext(AuthContext)

    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Product>({resolver: yupResolver(schema)});
    
    async function onSubmit(data: Product){
        if(auth.user?.adm === false){
            alert('Voce nao e um adm!')
            navigate('/')

        }
        const results = await api.registerProduct(data)
        if(results){
            navigate('/')
        }
        else{
            alert("Falha no registro do produto! Tente novamente mais tarde")
        }
        
    }
    
    return(
        <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='font-bold py-7 text-[3em] '>Registro de produtos</h1>
            <div className='grid grid-cols-2 text-center'>

                <label><p className='font-semibold text-[1.1em] py-2'>Nome</p>
                    <input className=" m-2 p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] w-2/3 border-gray-800 font-normal text-sm" {...register("name")}></input>
                    {<span>{errors.name?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Produtora</p>
                    <input className=" p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("developer")}></input>
                    {<span>{errors.developer?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Preco</p>
                    <input className=" p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("price")}></input>
                    {<span>{errors.price?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Desconto</p>
                    <input className=" p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("discount")}></input>
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Plataforma</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("platform")}></input>
                    {<span>{errors.platform?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Estoque</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("stock")}></input>
                    {<span>{errors.stock?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Departamento</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("dep")}></input>
                    {<span>{errors.dep?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Imagem 1</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("image1")}></input>
                    {<span>{errors.image1?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Imagem 2</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("image2")}></input>
                    {<span>{errors.image2?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Imagem 3</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("image3")}></input>
                    {<span>{errors.image3?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Video</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("video")}></input>
                    {<span>{errors.video?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Quantidade de parcelas</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("tax")}></input>
                    {<span>{errors.tax?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Titulo Descricao</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("title_description",)}></input>
                    {<span>{errors.title_description?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Imagem Descricao</p>
                    <input className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] m-2 w-2/3 border-gray-800 font-normal text-sm" {...register("image_description")}></input>
                    {<span>{errors.image_description?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Descricao 1</p>
                    <textarea rows={7} cols={65} className="p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] border-gray-800 font-normal text-sm" {...register("description")}></textarea>
                    {<span>{errors.description?.message}</span>}
                </label>
                <label><p className='font-semibold text-[1.1em] py-2'>Descricao 2</p>
                    <textarea rows={7} cols={65} className=" p-2 border-[1px] hover:bg-green-100 focus:bg-green-200 focus:border-[0.5px] active:bg-green-200 hover:border-[1.5px] border-gray-800 font-normal text-sm" {...register("description2")}></textarea>
                </label>
            </div>

            <button className=' border-[0.1px] border-black w-1/5 p-4 font-bold my-10 hover:bg-green-500 hover:text-white transition-all duration-300' type='submit'>Cadastrar Produto</button>
        </form>
    )
} 