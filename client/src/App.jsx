import { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/authSlice';

const FoodCard = lazy(() => import("./components/FoodCard"))
const ItemOptions = lazy(() => import("./ItemOptions"))
const Checkout = lazy(() => import("./Checkout"))
const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))
const AdminDashboard = lazy(() => import("./AdminDashboard"))


function App() {

  const queryClient = new QueryClient();

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const isAdmin = user?.role === 'admin';

const handleLogout = () => {
  dispatch(logout());
  alert('You have been logged out.');
};


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar onLogout={handleLogout}/>
        <Suspense fallback={<div className='loading'>Loading</div>}>
        <Routes>
          <Route path="/" element={<FoodCard/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/options" element={<ItemOptions />} />
          <Route path="/login" element={<Login />} />
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