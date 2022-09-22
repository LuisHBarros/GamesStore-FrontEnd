import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import {CartProvider}  from './contexts/cart.jsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
