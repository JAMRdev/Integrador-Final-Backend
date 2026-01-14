import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    // El cartel principal de la pagina
    return (
        <section className="hero">
            <div className="hero-content container">
                <h1>Bienvenido a <span className="text-brand">JAMR Store</span></h1>
                <p>La mejor tecnología al alcance de tu mano.</p>
                <Link to="/products" className="btn-primary">Ver Productos</Link>
            </div>
        </section>
    );
};
export default Hero;
