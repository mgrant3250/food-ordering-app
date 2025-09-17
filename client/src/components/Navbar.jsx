import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const Navbar = ({count, setCount}) => {
  return (
    
    <>
        <nav className='navbar'>
            <h1 className='navbar-title'>title</h1>
            <ul className='navbar-links'>
                <li><Link to="/">home</Link></li>
                <li><Link to="/test">test</Link></li>
                <li>dinner</li>

                <li><Link to="/checkout" className='cart-icon-wrapper'>
                <i className="fa-solid fa-cart-shopping"></i>
                <span className='cart-count-badge'>{count}</span>
                </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar