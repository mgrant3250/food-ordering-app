import { useState, useEffect, useRef } from 'react'
import './App.css'
import Test from './components/test'
import ItemOptions from './ItemOptions'
import FoodCard from './components/FoodCard'
import Navbar from './components/Navbar'
import Checkout from './Checkout'
import Register from './Register'
import Login from './Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const[cart, setCart] = useState({});
  const[count, setCount] = useState(0);
  const hasMounted = useRef(false);

  useEffect(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }
}, []);

  useEffect(() => {
    if(hasMounted.current){
  localStorage.setItem('cart', JSON.stringify(cart));
    }else{
      hasMounted.current = true
    }
}, [cart]);

  return (
    <>
      <Router>
        <Navbar count={count} setCount={setCount}/>
        <Routes>
          <Route path="/" element={<FoodCard cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/options" element={<ItemOptions cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/login" element={<Login onLogin={(data) => setUser(data.email)}/>} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
