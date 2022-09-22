import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { Product } from "../../types/Product"

export default function Home(){

    const api = useApi()
    const [produto, setProduto] = useState<Product[]>([])

    useEffect(() => {
      api.listItems().then((results) =>
        setProduto(results.data)
    ) 

    }, [api])
    
    return(
        
        <div>
            <ul className="grid grid-cols-5 items-center px-4 ">
            {produto.map((product) => <Link to={`/product/${product._id}`} className=' h-full shadow-inherit shadow-md  drop-shadow-xl flex-col items-center text-center hover:border-[0.01em] hover:border-black'>
                <img src={product.image1} className="w-[16rem] p-5"/>
                {product.discount? 
                <section>
                    <p className=' line-through font-extralight '>R$ {product.price},00</p>
                    <div className='grid grid-cols-2'>
                     <p className="  font-semibold" >R${product.price - Math.round( product.price * (product?.discount/100))},00 </p>
                      <p className=' ml-2 border-2 bg-[red] font-semibold text-white'> -{product.discount}% </p>
                    </div>
                    </section>
                : <p className=" font-bold">R${product.price},00</p>}
                <h1 className='font-bold'>{product.name}</h1>
                <p className='text-sm text-slate-400'>{product.dep}</p>
            </Link> )}
                
            </ul>
        </div>
    )
} 