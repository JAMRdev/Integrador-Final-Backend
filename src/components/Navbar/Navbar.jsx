import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../redux/cart/cartSlice';
import { logout } from '../../redux/user/userSlice';
import { clearToasts } from '../../redux/ui/uiSlice';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { currentUser } = useSelector((state) => state.user);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const dispatch = useDispatch();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Aca es donde armamos la parte de arriba
    return (
        <header className="header">
            <nav className="navbar container">
                <Link to="/" className="logo">JAMR Store</Link>
                <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
                    <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Inicio</NavLink></li>
                    <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>Nosotros</NavLink></li>
                    <li><NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Productos</NavLink></li>
                    <li><NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contacto</NavLink></li>
                    {currentUser && <li><NavLink to="/my-orders" onClick={() => setIsMenuOpen(false)}>Mis Órdenes</NavLink></li>}
                    {currentUser && <li><NavLink to="/developers" onClick={() => setIsMenuOpen(false)}>Desarrolladores</NavLink></li>}
                </ul>
                <div className="header-actions">
                    <button className="cart-icon" onClick={() => {
                        dispatch(clearToasts());
                        dispatch(toggleCart());
                    }}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span id="cart-count">{totalQuantity}</span>
                    </button>

                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: 'var(--white)', fontSize: '0.9rem' }}>Hola, {currentUser.name}</span>
                            <button
                                onClick={() => { dispatch(logout()); setIsMenuOpen(false) }}
                                style={{
                                    backgroundColor: 'var(--white)',
                                    color: 'var(--black)',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                backgroundColor: 'var(--white)',
                                color: 'var(--black)',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                fontSize: '0.9rem'
                            }}
                        >
                            Ingresar
                        </Link>
                    )}

                    <div className="menu-toggle" onClick={handleMenuToggle}>
                        <svg className="icon" style={{ width: '30px', height: '30px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
