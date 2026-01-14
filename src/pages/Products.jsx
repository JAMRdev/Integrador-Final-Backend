import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products/productsSlice';
import ProductCard from '../components/Products/ProductCard';

const Products = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector(state => state.products);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = ["all", "tech", "audio", "gaming"];

    useEffect(() => {
        dispatch(fetchProducts(selectedCategory === 'all' ? null : selectedCategory));
    }, [dispatch, selectedCategory]);

    return (
        <section className="products container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
            <h2>Nuestros Productos</h2>
            <div className="categories" style={{ justifyContent: 'center', display: 'flex', gap: '10px', marginBottom: '30px' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {cat === 'all' ? 'Todos' : cat}
                    </button>
                ))}
            </div>
            {loading ? (
                <p style={{ textAlign: 'center' }}>Cargando productos...</p>
            ) : products.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No hay productos en esta categoría.</p>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};
export default Products;
