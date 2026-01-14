import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cartSlice';
import { addToast } from '../../redux/ui/uiSlice';
import { formatPrice } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { id, name, price, image, description } = product;

    return (
        <div className="product-card">
            <Link to={`/product/${id || product._id}`}>
                <img src={image || product.img} alt={name} />
            </Link>
            <div className="product-info">
                <Link to={`/product/${id || product._id}`} style={{ color: 'white' }}>
                    <h3>{name}</h3>
                </Link>
                <p style={{ minHeight: '40px', fontSize: '0.9rem', color: '#aaa' }}>{description}</p>
                <div className="card-actions">
                    <span className="price" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--principalColor)' }}>{formatPrice(price)}</span>
                    <button className="btn-primary" onClick={() => {
                        dispatch(addToCart(product));
                        dispatch(addToast({ id: Date.now(), msg: `${name} agregado`, type: 'success' }));
                    }}>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
