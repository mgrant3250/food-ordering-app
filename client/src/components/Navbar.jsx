import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ count, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='navbar'>
      <h1 className='navbar-title'>Title</h1>

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
            <span className='cart-count-badge'>{count}</span>
          </Link>
        </li>

        {!user ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            <li className='navbar-user'>Welcome, {user.email}</li>
            <li>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;