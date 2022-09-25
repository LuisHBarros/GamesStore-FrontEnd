import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart';
import './index.css'
import { useContext, useEffect, useState } from "react"
import { Product } from '../../types/Product';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useApi } from '../../hooks/useApi';



type Items = {
    price : number,
    title : string,
    quantity: number,
}

export default function Carrinho(){
    const api = useApi()
    const auth = useContext(AuthContext)
    const cart = useCart()
    let totalPrice = 0;
    let totalDiscount = 0
    let items:Items = {
            price: 0,
            title: '',
            quantity: 0
        
    };

    const [arrayItems, setArrayItems] = useState<any[]>([])

        

    async function SubmitOrder(){

        const listarray:Items[] = []
        {Object.keys(cart.cart).forEach((good: any) =>  
        {
            const product = cart.cart[good]
            items.quantity = product.amount
            items.title = product.name
            items.price = (product.price - Math.round( product.price * (product?.discount!/100)))
            setArrayItems((old: any) => [...old,items])
            listarray.push({title:items.title,quantity: items.quantity,price: items.price})
        })}
        const object =({product:listarray, user_id: auth.user?._id})

        // @ts-ignore
        const response = await api.PaymentRequest(object)
        return window.open(response,"_self")

    }

    function removeFromCart(id:string){
        cart.removeProduct(id)
    }


    function plusQuantity(id:string, amount:number){
        const finalQuantity = (amount + 1)
        cart.updateProductAmount(id, finalQuantity)
        
    }
    function minusQuantity(id:string, amount:number){
        const finalQuantity = (amount - 1)
        if(finalQuantity < 1) removeFromCart(id)
        else{
            cart.updateProductAmount(id, finalQuantity)

        }
    }

    return(
    <>
    <div className='text-center'>
        <h1 className='text-4xl m-10 font-semibold'>Meu carrinho</h1>
    </div>
    <div className='gridb3'>

    <div>
        {Object.keys(cart.cart).map((good: any) => 
        
        {
            const product = cart.cart[good]
            totalPrice += product.price * product.amount  
            totalDiscount += (product.price - Math.round( product.price * (product?.discount!/100))) * product.amount
            return(
                <tr key={good} className='gridb2'>
                
                <div className='gridb'>

                    <img className='w-full' src ={product.image1}/>
                    <div className='flex flex-col justify-between'>
                        <div className='flex-grow w-full ml-9'>
                            <div className='flex flex-wrap'>
                                <h3 className='text-lg' >{product.name}</h3>

                            </div>
                        </div>
                        
                    </div>
                    <div className=''>
                        <button onClick={() => {removeFromCart(product._id)}} className=' text-xl font-bold'>X</button>
                    </div>
                </div>
                <div className=' gridb3'>
                    <div className='w-2/3 h-[3.5rem]'>
                                <span className='inline-block'>Quantidade
                    <p>
                        <button className='border-[1px] border-black rounded-lg w-8 hover:bg-gray-900 hover:text-white transition-all duration-300' onClick={() => {minusQuantity(product._id, product.amount)}}> - </button>
                    {product.amount}    
                        <button className='border-[1px] border-black rounded-lg w-8 hover:bg-gray-900 hover:text-white transition-all duration-300' onClick={() => {plusQuantity(product._id, product.amount)}}>+</button>
                    </p>
                                </span>

                            </div>
                    <div className='inline-block'>
                        <span className='text-lg line-through text-gray-600 ml-8'>R${product.price},00</span>
                        <span className='text-lg text-[red] font-semibold ml-8'>R${product.price - Math.round( product.price * (product?.discount!/100))},00</span>
                    </div>

                </div>

            </tr>
            )}
            )}
            </div>
        <div className='border-[1.5px] rounded-md border-slate-600 p-10 h-[100vh]'>
            <h1 className='text-2xl text-center'>Resumo da Compra</h1>
            <div className='py-5' >
                <p className='border-[0.1px] bg-stone-200 border-slate-400 px-5 block text-center'>Valor total <span className='text-gray-600 self-end text-center px-5'>R${totalPrice},00</span> </p>
                <p className='border-[0.1px] bg-stone-200 border-slate-400 px-5 block text-center'>Valor com desconto <span className='text-[red] font-semibold self-end text-center px-5'>R${totalDiscount},00</span> </p>
                <p className='border-[0.1px] bg-stone-200 border-slate-400 px-5 block text-center'>Você economizou <span className='text-green-400 font-semibold self-end text-center px-5'>R${totalPrice - totalDiscount},00</span></p>
            </div>

            <div className='my-10'>
                <button onClick={() => SubmitOrder()} className='rounded-md w-full border-[1px] border-black hover:text-lg hover:bg-green-400 m-2 p-5 transition-all duration-500' >Finalizar Compra</button>
                <Link className='text-center rounded-md block w-full border-[1px] border-black hover:text-lg hover:bg-green-400 m-2 p-5 transition-all duration-500' to='/'>Escolher mais produtos</Link>
            </div>
            <div className='pt-5'>
                <p className='block'>Fique tranquilo e finalize sua compra com segurança!</p>
                <p className=' pt-4'> Nós da <p className='inline-block text-lg hover:font-bold transition-all duration-500'>Clouthes Store</p> utilizamos o  <a className=' inline-block cursor-pointer' href='https://www.mercadopago.com.br/paid?code=D1SPL0YGO&utm_source=google&utm_medium=search&utm_campaign=MLB_MP_G_AO_BKW_X_SEARCH_INST_TXS_HOME&utm_content=INST_HOME_MP&utm_term=CAMPANHA_HOME_INSTITUCIONAL_PURO&matt_tool=70839661&matt_word=MLB_MP_G_AO_GEN_ALL_BRAND_ALL_CONV&utm_term=EXTENSAO_PRECO&gclid=CjwKCAjwpqCZBhAbEiwAa7pXeWYk7SrJqAyd937U9gxV2kuFQTAIiT6qWHGxfL1y2MKRd-TPRw17kxoCdBEQAvD_BwE'><img className='w-[6rem] inline-block' src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png"/></a> como meio de pagamento</p>
            </div>

            </div>
    </div>
    </>)
}

