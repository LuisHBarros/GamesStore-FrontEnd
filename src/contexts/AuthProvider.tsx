
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { Product } from "../types/Product";
import { User } from "../types/User";
import { AuthContext } from "./auth/AuthContext";

export function AuthProvider({ children} : {children: JSX.Element} ){
    const api = useApi();

    
    
    const[user, setUser] = useState<User|null>(null);
    
    async function signin(email: string, passport: string) {
        const data = await api.signin(email, passport);
        if(data === undefined)
            return false;
        if(data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }
    }

    async function register( email: string, password: string, name:string){
        const data = await api.registerUser(email, password, name)
        if(data.user && data.token){
            setUser(data.user);
            setToken(data.token);
            return true;
        }
        return false;
    }
    
    async function signout(){
        const storageData = localStorage.getItem('authToken');
        await api.logout(storageData!);
        setUser(null);
        setToken('')
    }
    
    function setToken(token: string){
        localStorage.setItem('authToken', token)
    }
    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data.user) {
                    setUser(data.user);
                }
            }
        }
        validateToken();
    }, [api]);

    return(
        //@ts-ignore
        <AuthContext.Provider value={{ user, signin, signout, register }}>
            {children}
        </AuthContext.Provider>
    )
}