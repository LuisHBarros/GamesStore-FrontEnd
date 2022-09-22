import { useContext } from "react"
import { AuthContext } from "../../contexts/auth/AuthContext"

export default function Private(){

    const auth = useContext(AuthContext)

    return(
        <div className='text-center'>
            <h2>Pagina privada</h2>
            Ola {auth.user?.name}
        </div>
    )
} 