import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products/productsSlice';
import ProductCard from '../components/Products/ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector(state => state.products);
    const featuredProducts = products.slice(0, 3);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <Hero />
            {/* Un poco de info de nosotros */}
            <section className="about container section-padding" style={{ textAlign: 'center' }}>
                <h2>Sobre Nosotros</h2>
                <p style={{ maxWidth: '700px', margin: '0 auto 20px' }}>Somos una empresa dedicada a traer las últimas innovaciones tecnológicas. Nuestro compromiso es la calidad y la satisfacción del cliente.</p>
                <Link to="/about" className="btn-primary" style={{ display: 'inline-block' }}>Leer más</Link>
            </section>

            {/* Lo mas vendido */}
            <section className="products container section-padding">
                <h2>Productos Destacados</h2>
                {loading ? (
                    <p style={{ textAlign: 'center' }}>Cargando productos...</p>
                ) : (
                    <>
                        <div className="products-grid">
                            {featuredProducts.map(product => (
                                <ProductCard key={product.id || product._id} product={product} />
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <Link to="/products" className="btn-primary" style={{ display: 'inline-block' }}>Ver todos</Link>
                        </div>
                    </>
                )}
            </section>
        </>
    );
};
export default Home;
