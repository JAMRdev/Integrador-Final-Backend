import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeInfoModal } from '../../redux/ui/uiSlice';

const InfoModal = () => {
    const { isOpen, text, type, redirectTo } = useSelector((state) => state.ui.infoModal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleConfirm = () => {
        dispatch(closeInfoModal());
        if (redirectTo) {
            navigate(redirectTo);
        }
    };

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <p>{text}</p>
                <div className="confirm-actions">
                    <button
                        className={type === 'error' ? 'btn-cancel' : 'btn-confirm'}
                        onClick={handleConfirm}
                        style={{ width: '100%' }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
