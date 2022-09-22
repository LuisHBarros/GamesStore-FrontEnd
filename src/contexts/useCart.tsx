import { createContext, ReactNode, useContext, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/Product';

interface CartProviderProps {
  children: ReactNode;
}

const api = useApi()

interface UpdateProductAmount {
  productId: string;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: string) => {
      const productAlreadyInCart = cart.find(product => product._id === productId)

      if(!productAlreadyInCart) {
        const { data: product } = await api.listItemById(productId)

        if(product.stock > 0) {
          setCart([...cart, {...product, amount: 1}])
          localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart, {...product, amount: 1}]))
          return;
        }
      }

      if(productAlreadyInCart) {
        const { data: product } = await api.listItemById(productId)

        if (product.stock > productAlreadyInCart.amount) {
          const updatedCart = cart.map(cartItem => cartItem._id === productId ? {
            ...cartItem,
            amount: Number(cartItem.amount) + 1
          } : cartItem)
  
          setCart(updatedCart)
          localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
          return;
        }
      }
  };

  const removeProduct = (productId: string) => {
    try {
      const productExists = cart.some(cartProduct => cartProduct._id === productId)
      if(!productExists) {
        return
      }

      const updatedCart = cart.filter(cartItem => cartItem._id !== productId)
      setCart(updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if(amount < 1){
        return
      }

      const { data: product } = await api.listItemById(productId)
      const productAmount = product.stock;
      const stockIsFree = amount > productAmount

      if(stockIsFree) {
        return
      }

      const productExists = cart.some(cartProduct => cartProduct._id === productId)
      if(!productExists) {
        return
      }

      const updatedCart = cart.map(cartItem => cartItem._id === productId ? {
        ...cartItem,
        amount: amount
      } : cartItem)
      setCart(updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}