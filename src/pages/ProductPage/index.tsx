import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { Product } from "../../types/Product"
import * as yup from "yup"
import "./index.css"
import { useCart } from "../../contexts/cart.jsx"


export default function ProductPage(){

    const {addProduct}  = useCart()
    const navigate = useNavigate()

    const params = useParams()
    const api = useApi()
    const [product, setProduct] = useState<Product>()
    useEffect(() => {
        if(params.id){
            api.listItemById(params.id).then((Response =>(
                setProduct(Response.data))
                ) 
                )
            }
            
        }, [api])
        
        const image1 = product?.image1
        const [image, setImage] = useState<any>(product?.image1)
        function setFirstImage(){
            if(image === undefined)
            {
                setImage(product?.image1)
            }
        }
        
        function onSubmit(){
            addProduct((product?._id!))
            navigate("/cart")
            

        }
        return(
            <div className='py-10'>
                
        <div className="gridbox">
        <div className=''>
            <div className='gridbox'>
                <img src={ image? image: product?.image1 } className=' border-[1px] border-gray-300 w-[56rem]'/>
                <div className=' flex flex-col self-center'>
                    <button onClick={() => setImage(product?.image1)}>
                        <img className='border-[1px] border-gray-300' src={product?.image1} width={100}/>
                    </button>
                    <button onClick={() => setImage(product?.image2)}>
                    <img className='border-[1px] border-gray-300' src={product?.image2} width={100}/>
                    </button>
                    <button onClick={() => setImage(product?.image3)}>
                        
                    <img className='border-[1px] border-gray-300' src={product?.image3} width={100}/>
                    </button>
                    </div>
            </div>
            <div className='gridbox3 items-center'>
        <section className='p-10'>
            <h1 className='pb-2 text-center font-medium text-xl'>{product?.title_description}</h1>
            <p className='pb-5 text-base'>{product?.description}</p>
            <p className='pb-5 text-base'>{product?.description2}</p>
        </section>
            <img className='border-gray-300 ' src={product?.image_description} title="description video" width={400}>
            </img>
            <></>
        </div>
                <iframe className='border-gray-300 h-[20rem] w-[35rem] justify-center ml-auto block ' src={product?.video} title="description video"/>

        </div>
        <div className='items-start mr-7'>
            <p className='font-light text-sm text-gray-400'>{product?.dep}</p>
            <h1 className=' text-3xl font-bold'>{product?.name}</h1>
            {product?.discount? 
                <section className='flex flex-row text-lg'>
                    <p className=' line-through font-extralight '>R$ {product.price},00</p>
                     <p className=" text-[red] pl-5  font-semibold" >R${product.price - Math.round( product.price * (product?.discount/100))},00 </p>
                    </section>
                    : <p className=" font-bold">R${product?.price},00</p>
                }
                <section>
                    <p className='pt-2 text-lg'>Até {product?.tax}x de <span className='font-bold'>R${
                    product?.discount? 
                    
                    Math.round((product.price - Math.round( product.price * (product?.discount/100))) / product.tax)
                    : Math.round(product?.price! / product?.tax!)
                    },00</span> sem juros</p>
                </section>
                <div className=' py-10'>
                    <div className='text-center py-5 font-semibold'>
                        <button onClick={() => onSubmit()} className=' hover:text-xl transition-all duration-500 border-2 mt-5 rounded-lg p-2 w-5/6 border-gray-400 hover:bg-black hover:text-white'>Adicionar ao carrinho</button>
                    </div>
                    </div>
                <section className='py-[2rem]'>
                    <p className='pb-5'>FRETE GRÁTIS EM COMPRAS A PARTIR DE R$ 199,00</p>
                    <p className=''>DEVOLUÇÕES GRATUITAS. NÃO SERVIU? DEVOLVA EM UM PRAZO DE 30 DIAS.</p>
                </section>
            </div>
        </div>
        <section>
            Outras pessoas Tambem gostaram
        </section>
        </div>
    )
}