import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/orders/ordersSlice';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: orders, loading, error } = useSelector(state => state.orders);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            dispatch(fetchMyOrders());
        }
    }, [dispatch, currentUser, navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading && orders.length === 0) {
        return (
            <section className="container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
                <h2>Cargando tus órdenes...</h2>
            </section>
        );
    }

    return (
        <section className="container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
            <h2 style={{
                marginBottom: '40px',
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(90deg, var(--white), var(--principalColor))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
            }}>
                Mis Órdenes
            </h2>
            {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(30, 30, 30, 0.6)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Aún no tienes pedidos registrados.</p>
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
                                        border: '1px solid rgba(153, 254, 84, 0.3)'
                                    }}>
                                        ✓ RECIBIDO
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
                                                📦
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontWeight: '600', color: 'var(--white)' }}>{item.name}</p>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--principalColorVariation2)' }}>Cantidad: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span style={{ fontWeight: 'bold', color: 'var(--white)' }}>${(item.price * item.quantity).toLocaleString()}</span>
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
                                    Envío: ${order.shippingPrice || 0}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--principalColorVariation2)' }}>Total Pagado</span>
                                    <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--principalColor)' }}>
                                        ${order.totalAmount.toLocaleString()}
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
