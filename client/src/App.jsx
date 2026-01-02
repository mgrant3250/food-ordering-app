import { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/authSlice';
import { toast, ToastContainer } from 'react-toastify';

const FoodCard = lazy(() => import("./components/FoodCard"))
const ItemOptions = lazy(() => import("./ItemOptions"))
const Checkout = lazy(() => import("./Checkout"))
const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))
const AdminDashboard = lazy(() => import("./AdminDashboard"))
const ForgotPassword = lazy(() => import("./ForgotPassword"))
const ResetPassword = lazy(() => import("./ResetPassword"))


function App() {

  const queryClient = new QueryClient();

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const isAdmin = user?.role === 'admin';

const handleLogout = () => {
  dispatch(logout());
  toast.success('You have been logged out.');
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route 
          path="/admin" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
        />

        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </Router>
      </QueryClientProvider>
    </>
  )
}

export default App