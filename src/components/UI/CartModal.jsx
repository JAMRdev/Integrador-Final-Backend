import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCart, removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/cart/cartSlice';
import { openModal, addToast } from '../../redux/ui/uiSlice';

const CartModal = () => {
    const { cartItems, isCartOpen } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

    const handleClose = () => {
        dispatch(toggleCart());
    };

    return (
        <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={handleClose}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h3>Tu Carrito</h3>
                    <button onClick={handleClose}>X</button>
                </div>
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p style={{ padding: '20px', textAlign: 'center' }}>El carrito está vacío</p>
                    ) : (
                        cartItems.map((item) => {
                            const itemId = item._id || item.id;
                            return (
                                <div key={itemId} className="cart-item">
                                    <img src={item.image || item.img} alt={item.name} />
                                    <div className="cart-item-info">
                                        <h4>{item.name}</h4>
                                        <p>${item.price}</p>
                                    </div>
                                    <div className="quantity-controls">
                                        <button onClick={() => dispatch(decrementQuantity(itemId))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(incrementQuantity(itemId))}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => {
                                        dispatch(openModal({
                                            text: `¿Eliminar ${item.name} del carrito?`,
                                            actionType: 'REMOVE_ITEM',
                                            payload: itemId
                                        }));
                                    }}>
                                        🗑️
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="cart-footer">
                    {cartItems.length > 0 && !currentUser && (
                        <p className="auth-disclaimer" style={{
                            fontSize: '0.85rem',
                            color: 'var(--secundaryColor)',
                            marginBottom: '10px',
                            textAlign: 'center',
                            padding: '5px',
                            border: '1px dashed var(--secundaryColor)',
                            borderRadius: '5px'
                        }}>
                            ⚠️ Debes iniciar sesión o registrarte para completar tu compra.
                        </p>
                    )}
                    <p>Total: <span>${totalPrice}</span></p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn-primary" onClick={() => {
                            dispatch(toggleCart());
                            if (!currentUser) {
                                navigate('/login?redirect=checkout');
                            } else {
                                navigate('/checkout');
                            }
                        }}>Comprar</button>
                        <button className="btn-cancel" onClick={() => {
                            dispatch(openModal({
                                text: '¿Estás seguro de que quieres vaciar el carrito?',
                                actionType: 'CLEAR_CART'
                            }));
                        }}>Vaciar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
