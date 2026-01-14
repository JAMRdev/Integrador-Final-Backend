import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/orders/ordersSlice';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatCurrency';

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: orders, loading, error } = useSelector(state => state.orders);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchMyOrders());
        }
    }, [dispatch, currentUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading && orders.length === 0) {
        return (
            <section className="container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
                <h2>Tus Órdenes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', maxWidth: '900px', margin: '0 auto' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="skeleton skeleton-order"></div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
            <h2>Mis Órdenes</h2>
            {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

            {orders.length === 0 ? (
                <div style={{ padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', background: 'rgba(30, 30, 30, 0.6)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                    <svg className="icon" viewBox="0 0 24 24" style={{ width: '100px', height: '100px', opacity: 0.2 }}>
                        <path d="M21 8.5V16c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8.5"></path>
                        <path d="M3 8.5c0-1.2.8-2.2 2-2.5l7-3 7 3c1.2.3 2 1.3 2 2.5"></path>
                        <path d="M12 22v-9"></path>
                    </svg>
                    <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Todavía no has realizado ninguna orden</p>
                    <button className="btn-primary" onClick={() => navigate('/products')}>Empezar a comprar</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
                    {orders.map((order) => (
                        <div key={order._id} style={{
                            background: 'rgba(40, 40, 40, 0.6)',
                            backdropFilter: 'blur(10px)',
                            padding: '30px',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            transition: 'transform 0.3s ease',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '20px' }}>
                                <div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        color: 'var(--principalColor)',
                                        fontWeight: 'bold',
                                        display: 'block',
                                        marginBottom: '5px'
                                    }}>
                                        Orden #{order._id.slice(-6).toUpperCase()}
                                    </span>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--white)' }}>{formatDate(order.createdAt)}</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                    <span style={{
                                        padding: '6px 14px',
                                        borderRadius: '50px',
                                        backgroundColor: 'rgba(153, 254, 84, 0.15)',
                                        color: 'var(--principalColor)',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        border: '1px solid rgba(153, 254, 84, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}>
                                        <svg className="icon" viewBox="0 0 24 24" style={{ width: '1.2em', height: '1.2em', strokeWidth: '3.5px' }}>
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        RECIBIDO
                                    </span>
                                    <button
                                        onClick={() => navigate(`/contact?orderId=${order._id.slice(-6).toUpperCase()}`)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--white)',
                                            fontSize: '0.75rem',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            opacity: 0.8
                                        }}
                                        onMouseOver={(e) => e.target.style.opacity = 1}
                                        onMouseOut={(e) => e.target.style.opacity = 0.8}
                                    >
                                        Contactar Soporte
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '15px', marginBottom: '25px' }}>
                                {order.items.map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px 15px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '12px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'var(--principalColor)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--black)' }}>
                                                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 8.5V16c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8.5"></path>
                                                    <path d="M3 8.5c0-1.2.8-2.2 2-2.5l7-3 7 3c1.2.3 2 1.3 2 2.5"></path>
                                                    <path d="M12 22v-9"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontWeight: '600', color: 'var(--white)' }}>{item.name}</p>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--principalColorVariation2)' }}>Cantidad: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span style={{ fontWeight: 'bold', color: 'var(--white)' }}>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05), transparent)',
                                padding: '15px 20px',
                                borderRadius: '15px'
                            }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--principalColorVariation2)' }}>
                                    Envío: {formatPrice(order.shippingPrice || 0)}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--principalColorVariation2)' }}>Total Pagado</span>
                                    <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--principalColor)' }}>
                                        {formatPrice(order.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyOrders;
