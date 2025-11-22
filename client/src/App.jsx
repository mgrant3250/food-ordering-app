import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const FoodCard = lazy(() => import("./components/FoodCard"))
const ItemOptions = lazy(() => import("./ItemOptions"))
const Checkout = lazy(() => import("./Checkout"))
const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))
const AdminDashboard = lazy(() => import("./AdminDashboard"))


function App() {
  const[cart, setCart] = useState({});
  const[count, setCount] = useState(0);
  const [user, setUser] = useState(null)
  const hasMounted = useRef(false);

  const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar count={count} user={user} onLogout={handleLogout}/>
        <Suspense fallback={<div className='loading'>Loading</div>}>
        <Routes>
          <Route path="/" element={<FoodCard cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/options" element={<ItemOptions cart={cart} setCart={setCart} count={count} setCount={setCount}/>} />
          <Route path="/login" element={<Login onLogin={(userData) => setUser(userData)}/>} />
          <Route path="/register" element={<Register />} />

          <Route 
          path="/admin" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
        />

        </Routes>
      </Suspense>
      </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
