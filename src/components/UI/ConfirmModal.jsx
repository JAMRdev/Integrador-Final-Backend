import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/ui/uiSlice';
import { clearCart, removeFromCart } from '../../redux/cart/cartSlice';

const ConfirmModal = () => {
    const { isOpen, text, actionType, payload } = useSelector((state) => state.ui.modal);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (actionType === 'CLEAR_CART') {
            dispatch(clearCart());
        } else if (actionType === 'REMOVE_ITEM') {
            dispatch(removeFromCart(payload));
        }
        dispatch(closeModal());
    };

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <p>{text}</p>
                <div className="confirm-actions">
                    <button className="btn-cancel" onClick={() => dispatch(closeModal())}>Cancelar</button>
                    <button className="btn-confirm" onClick={handleConfirm}>Aceptar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
