import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet } from 'react-router-dom';
import Hero from './components/Hero';
import { CartProvider } from './contexts/cartContext';
import Footer from './components/Footer';
import Cpy from './components/Cpy';
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.css'

const App = () => {
  return (
<CartProvider>
    <Hero />
    <Outlet />
</CartProvider>

  )
}

export default App