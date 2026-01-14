import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="container section-padding" style={{
            paddingTop: '150px',
            minHeight: '80vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
        }}>
            <h2 style={{ fontSize: '6rem', marginBottom: '0' }}>404</h2>
            <div style={{ margin: '20px 0' }}>
                <svg className="icon" viewBox="0 0 24 24" style={{ width: '120px', height: '120px', color: 'var(--principalColor)', opacity: 0.8 }}>
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-5c1.1-1.54 3.05-1.48 4.14-.39"></path>
                    <path d="M15 9h5s-3.03.55-5 2c-1.54 1.1-1.48 3.05-.39 4.14"></path>
                </svg>
            </div>
            <h3>¡Houston, tenemos un problema!</h3>
            <p style={{ color: '#ccc', maxWidth: '500px' }}>
                Parece que te has perdido en el espacio. La página que buscas no existe o ha sido movida a otra órbita.
            </p>
            <Link to="/" className="btn-primary" style={{ marginTop: '20px', padding: '12px 30px' }}>
                Volver a la Base
            </Link>
        </section>
    );
};

export default NotFound;
