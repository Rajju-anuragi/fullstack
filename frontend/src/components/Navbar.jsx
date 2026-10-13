import { useContext } from 'react';
import React from 'react';

import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { authContext } from '../context/authContexts';
 const cartItems=[];
const Navbar = () => {
    const { user, logout }
        = useContext(authContext);

    return (
        <nav className="navbar" >
            <div className="navbar-brand">
                <Link to="/">
                    <img src='/shopnow.png' alt="shopnow" style={{ height: "36px", width: "36px" }} />
                    ShopNow
                </Link>
            </div>


            <ul className="navbar-links">
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                <li>
                    <Link to="/cart">Cart ({cartItems.length})</Link>
                </li>

                {user ? (
                    <>
                        <li>
                            <Link to="/profile">
                                Hi, {user.firstName || 'Account'}
                            </Link>
                        </li>
                        {user.role === 'admin' && (
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                        )}
                        <li>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="btn-logout"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) :

                    (
                        <li> <Link to="/login">Login</Link></li>
    ) }
                        </ul>
        </nav>
    );
};

export default Navbar;