import { useState, useEffect, useRef } from 'react'
import './App.css'
import Test from './components/test'
import ItemOptions from './ItemOptions'
import FoodCard from './components/FoodCard'
import Navbar from './components/Navbar'
import Checkout from './Checkout'
import Register from './Register'
import Login from './Login'
import AdminDashboard from './AdminDashboard'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App() {
  const[cart, setCart] = useState({});
  const[count, setCount] = useState(0);
  const [user, setUser] = useState(null)
  const hasMounted = useRef(false);

  useEffect(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }

  const storedUser = localStorage.getItem('user');
  if (storedUser) setUser(JSON.parse(storedUser));

}, []);

  useEffect(() => {
    if(hasMounted.current){
  localStorage.setItem('cart', JSON.stringify(cart));
    }else{
      hasMounted.current = true
    }
}, [cart]);

 const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert('You have been logged out.');
  };

  const isAdmin = user?.role === "admin";

  return (
    <>
      <Router>
        <Navbar count={count} user={user} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<FoodCard cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/options" element={<ItemOptions cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/login" element={<Login onLogin={(data) => setUser(data.email)}/>} />
          <Route path="/register" element={<Register />} />

          <Route 
          path="/admin" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
        />

        </Routes>
      </Router>
    </>
  )
}

export default App
