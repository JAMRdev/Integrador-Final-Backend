import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { addToast } from '../redux/ui/uiSlice';
import { productsService } from '../services';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productsService.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        dispatch(addToast({ id: Date.now(), msg: 'Producto añadido', type: 'success' }));
    };

    if (loading) return <div className="container section-padding" style={{ paddingTop: '120px', textAlign: 'center' }}>Cargando...</div>;
    if (!product) return <div className="container section-padding" style={{ paddingTop: '120px', textAlign: 'center' }}>Producto no encontrado</div>;

    return (
        <section className="product-detail container section-padding" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={product.img || product.image}
                    alt={product.name}
                    style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', border: '1px solid var(--primary-color)' }}
                />
                <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
                    <Link to="/products" style={{ color: 'var(--primary-color)', marginBottom: '20px', display: 'inline-block' }}>← Volver</Link>
                    <small style={{ display: 'block', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>{product.category}</small>
                    <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{product.name}</h2>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '20px' }}>${product.price}</p>
                    <p style={{ marginBottom: '30px', color: '#ccc', lineHeight: '1.6' }}>{product.description || 'Descripción detallada del producto...'}</p>
                    <button className="btn-primary" onClick={handleAddToCart} style={{ padding: '15px 40px' }}>Añadir al Carrito</button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
