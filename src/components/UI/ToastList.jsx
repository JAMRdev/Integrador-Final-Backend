import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../redux/ui/uiSlice';

const ToastList = () => {
    const toasts = useSelector((state) => state.ui.toasts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                dispatch(removeToast(toasts[0].id));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toasts, dispatch]);

    return (
        <div id="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast ${toast.type}`}>
                    <span>{toast.msg}</span>
                    <button onClick={() => dispatch(removeToast(toast.id))} style={{ background: 'none', color: 'inherit', marginLeft: '10px', fontSize: '1.2rem' }}>&times;</button>
                </div>
            ))}
        </div>
    );
};

export default ToastList;
