import { useContext } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { AuthContext } from "./contexts/auth/AuthContext"
import { RequireAuth } from "./contexts/auth/RequireAuth"
import Home from "./pages/Home"
import Private from "./pages/Private"
import ProductPage from "./pages/ProductPage"
import RegisterProduct from "./pages/RegisterProduct"
import Register from "./pages/Register"
import Recovery from "./pages/Recovery"
import ResetPassword from "./pages/ResetPassword"
import { Login } from "./pages/Login"
import Carrinho from "./pages/carrinho"


function App() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  async function handleLogout(){
    await auth.signout();
    navigate('/')
  }
  return (
    <div className=" items-center font-serif bg-slate-100">
      <header  className='bg-slate-200'>
      <h1 className=" text-center font-bold font-sans text-[5em]">Games Store</h1>
    <nav className='text-center'>
      <Link className="p-2 text-lg text-black inline-block my-0 mx-2.5 hover:text-green-500 font-semibold text-[1em] transition-all duration-300" to='/'>Home</Link>
      <Link className="p-2 text-lg text-black inline-block my-0 mx-2.5 hover:text-green-500 font-semibold text-[1em] transition-all duration-300" to='/private'>Privada</Link>
      {auth.user && <Link className="text-black inline-block my-0 mx-2.5 hover:text-green-500 font-semibold text-[1em] transition-all duration-500" to='/cart'>Carrinho</Link>}
      {auth.user?.adm === true &&  <Link className="p-2 text-lg text-black inline-block my-0 mx-2.5 hover:text-green-500 font-semibold text-[1em] transition-all duration-300" to='registerproduct'>Register Product</Link>}
      {auth.user && <a className="text-black inline-block my-0 mx-2.5 hover:text-red-600 font-semibold text-[1em] transition-all duration-500" href='' onClick={handleLogout}>Logout</a>}
    </nav>
      </header>
      <hr/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<RequireAuth><Carrinho/></RequireAuth>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/private' element={<RequireAuth><Private/></RequireAuth>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/recovery' element={<Recovery/>}/>
        <Route path='/registerproduct' element={<RequireAuth><RegisterProduct/></RequireAuth>}/>
        <Route path={'/product/:id'} element={<ProductPage/>}/>
        <Route path={'/resetPassword'} element={<ResetPassword/>}/>
      </Routes>
      <footer className=' text-center pt-[5rem] pb-[2rem] bg-slate-300 border-[1px] border-black'>
        <h1 className=''>Feito com s2 por <a className='font-semibold hover:text-green-500 transition-all duration-500' href='https://www.linkedin.com/in/luis-henrique-de-barros-207929226/'>Luis Henrique</a></h1>
        <p className='py-[1rem]'>Produzido com NodeJs (Banco de dados MongoDB) e ReactJs</p>
      </footer>
    </div>
  )
}

export default App
