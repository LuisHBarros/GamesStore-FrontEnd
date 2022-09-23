import axios from "axios";
import { Product } from "../types/Product";
import { User } from "../types/User";

const api = axios.create({
    baseURL: 'http://18.230.74.99:3001'
});

const acessToken = 'TEST-2551703936672501-091317-884eeda72278d8236c5d4d92b14fec03-149141930'

export const useApi = () => ({
    validateToken: async (token:string) => {
        const response = await api.get('/test-token', {headers:{'Authorization': `Bearer ${token}`}})
        return response.data
    },
    signin: async (email:string, password:string) => {
        try {
            const response = await api.post('/user/login', { email, password});
            return response.data;
            
        } catch (e) {
            return false
        }
    },
    registerUser: async (name: string, password: string, email: string) =>{
        try {
            const response = await api.post('/user/register', {name, password, email});
            return response.data;
            
        } catch (e) {
            return 0
        }
            

    },
    logout: async (token: string)=>{
        const response = await api.get('/user/logout', {headers:{'Authorization': `Bearer ${token}`}})
        return response.data;
    },
    listItems: () =>{
        return api.get<Product[]>('/product');
        
    },
    listItemById: async (id:string) => {
        const response = await api.get<Product>(`/product/${id}`)
        return response
    },
    registerProduct: async (object : Product) => {
        const token = localStorage.getItem('authToken');
        const response = await api.post<Product>('/product', object, {headers:{'Authorization': `Bearer ${token}`}})
        return response;
    },
    recovery: async (object: User) => {
        try {
            const response = await api.post<User>('user/forgot-password', object)
            console.log(response)
            return response
            
        } catch (e) {
            return undefined
        }
    },

    PaymentRequest: async(object: {products:any, user_id:string}) => {
        try {       
            const response = await api.post('payment', object, {headers:{'Authorization' : `Bearer ${acessToken}`}})
            return response.data.payment.payment_link;
        } catch (e) {
            return e
        }
    },

    resetPassword: async (object: User) => {
        const { email, password, PasswordResetToken } = object

        try {
            const results = await api.post<User>('user/recover-password', object)
            return 201
        } catch (e: any) {
            console.log(e)
            return e.response.status
        }
                
    },
})