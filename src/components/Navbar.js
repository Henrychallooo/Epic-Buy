import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png'; // logo image path
import SignOut from "./SignOut";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [checkoutCount, setCheckoutCount] = useState(5); // Initialize the count to 0

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} alt='Logo' className='logo-image' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                Buy
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/pay' className='nav-links' onClick={closeMobileMenu}>
                Pay <span className="checkout-count">{checkoutCount}</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/mystore'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sell
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/driver'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Driver
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/discover'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Discover <i className="fas fa-search"></i>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/SignIn'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                SignOut
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
