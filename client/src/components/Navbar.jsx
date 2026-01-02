import { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useSelector(state => state.cart ||  { items: [] });
  const totalCount = cart?.items?.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();

  return (
    <nav className='navbar'>
      <h1 className='navbar-title'>Order App</h1>

      <div className='hamburger' onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li>Dinner</li>
        {user?.role === "admin" && (
          <li><Link to="/admin">Admin Dashboard</Link></li>
        )}
      </ul>

      <ul className={`navbar-right ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/checkout" className='cart-icon-wrapper'>
            <i className="fa-solid fa-cart-shopping"></i>
            {totalCount > 0 && <span className='cart-count-badge'>{totalCount}</span>}
          </Link>
        </li>

        {!user ? (
          <li className='login-btn'><Link to="/login">Login</Link></li>
        ) : (
          <>
            <li className='navbar-user'>Welcome, {user.email}</li>
            <li>
              {/* <button onClick={onLogout} className="logout-btn">Logout</button> */}
              <button onClick={onLogout} className="logout-btn">Logout</button>

            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;