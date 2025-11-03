import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const Navbar = ({count, user, onLogout}) => {
  return (
    
    <>
        <nav className='navbar'>
            <h1 className='navbar-title'>title</h1>
            <ul className='navbar-links'>
                <li><Link to="/">home</Link></li>
                {!user ? (
                <li><Link to="/login">test</Link></li>
                ) : (
                  <>
            <li>Welcome, {user.email}</li>
            <li>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </li>
          </>
                )}
                <li>dinner</li>

                <li><Link to="/checkout" className='cart-icon-wrapper'>
                <i className="fa-solid fa-cart-shopping"></i>
                <span className='cart-count-badge'>{count}</span>
                </Link>
                </li>

                {user?.role === "admin" && (
                <li><Link to="/admin">Admin Dashboard</Link></li>
                )}
            </ul>
        </nav>
    </>
  )
}

export default Navbar