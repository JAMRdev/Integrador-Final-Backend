import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cartSlice';
import { addToast } from '../../redux/ui/uiSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { id, name, price, image, description } = product;

    return (
        <div className="product-card">
            <Link to={`/product/${id}`}>
                <img src={image} alt={name} />
            </Link>
            <div className="product-info">
                <Link to={`/product/${id}`} style={{ color: 'white' }}>
                    <h3>{name}</h3>
                </Link>
                <p>{description}</p>
                <span className="price">${price}</span>
                <button className="btn-primary" onClick={() => {
                    dispatch(addToCart(product));
                    dispatch(addToast({ id: Date.now(), msg: `${name} agregado al carrito`, type: 'success' }));
                }}>
                    Agregar
                </button>
            </div>
        </div>
    );
};
export default ProductCard;
