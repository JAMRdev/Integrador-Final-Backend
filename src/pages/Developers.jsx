import React from 'react';

const Developers = () => {
    return (
        <section className="container section-padding" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <h2>Para Desarrolladores</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {/* Repositorio */}
                <div style={{
                    background: 'rgba(40, 40, 40, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease'
                }}>
                    <h3 style={{ color: 'var(--principalColor)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg className="icon" viewBox="0 0 24 24" style={{ width: '1.4em', height: '1.4em' }}>
                            <path d="M21 8.5V16c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8.5"></path>
                            <path d="M3 8.5c0-1.2.8-2.2 2-2.5l7-3 7 3c1.2.3 2 1.3 2 2.5"></path>
                            <path d="M12 22v-9"></path>
                        </svg>
                        Repositorio
                    </h3>
                    <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--principalColorVariation2)' }}>
                        Accede al código fuente completo del backend, incluyendo modelos, controladores y configuración de despliegue.
                    </p>
                    <a
                        href="https://github.com/JAMRdev/Integrador-Final-Backend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ display: 'inline-block', fontSize: '0.85rem' }}
                    >
                        Ver en GitHub
                    </a>
                </div>

                {/* API Production */}
                <div style={{
                    background: 'rgba(40, 40, 40, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                    <h3 style={{ color: 'var(--principalColor)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg className="icon" viewBox="0 0 24 24" style={{ width: '1.4em', height: '1.4em' }}>
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                            <path d="M9 12H4s.55-3.03 2-5c1.1-1.54 3.05-1.48 4.14-.39"></path>
                            <path d="M15 9h5s-3.03.55-5 2c-1.54 1.1-1.48 3.05-.39 4.14"></path>
                        </svg>
                        API en Producción
                    </h3>
                    <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--principalColorVariation2)' }}>
                        Endpoint base para todas las peticiones REST. Alojado en Vercel con alta disponibilidad.
                    </p>
                    <code style={{
                        display: 'block',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '0.8rem',
                        color: 'var(--white)',
                        marginBottom: '15px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        https://integrador-final-backend.vercel.app/
                    </code>
                    <a
                        href="https://integrador-final-backend.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--principalColor)', fontSize: '0.85rem', textDecoration: 'underline' }}
                    >
                        Probar Endpoint
                    </a>
                </div>

                {/* Documentation */}
                <div style={{
                    background: 'rgba(40, 40, 40, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                    <h3 style={{ color: 'var(--principalColor)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg className="icon" viewBox="0 0 24 24" style={{ width: '1.4em', height: '1.4em' }}>
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        Documentación
                    </h3>
                    <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--principalColorVariation2)' }}>
                        Swagger UI interactivo para probar los endpoints de Autenticación, Productos y Órdenes.
                    </p>
                    <a
                        href="https://integrador-final-backend.vercel.app/api-docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ display: 'inline-block', fontSize: '0.85rem' }}
                    >
                        Abrir Swagger
                    </a>
                </div>

                {/* API Usage Details */}
                <div style={{
                    gridColumn: '1 / -1',
                    background: 'rgba(40, 40, 40, 0.4)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginTop: '20px'
                }}>
                    <h3 style={{ color: 'var(--white)', marginBottom: '20px' }}>Guía de Uso Rápido</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div>
                            <h4 style={{ color: 'var(--principalColor)', fontSize: '0.95rem', marginBottom: '10px' }}>Autenticación</h4>
                            <ul style={{ fontSize: '0.85rem', color: 'var(--principalColorVariation2)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <li>• POST <code>/api/auth/register</code></li>
                                <li>• POST <code>/api/auth/login</code></li>
                                <li>• GET <code>/api/auth/me</code> (requiere Token)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--principalColor)', fontSize: '0.95rem', marginBottom: '10px' }}>Productos</h4>
                            <ul style={{ fontSize: '0.85rem', color: 'var(--principalColorVariation2)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <li>• GET <code>/api/products</code></li>
                                <li>• GET <code>/api/products/:id</code></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--principalColor)', fontSize: '0.95rem', marginBottom: '10px' }}>Órdenes</h4>
                            <ul style={{ fontSize: '0.85rem', color: 'var(--principalColorVariation2)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <li>• GET <code>/api/orders</code> (requiere Token)</li>
                                <li>• POST <code>/api/orders</code> (requiere Token)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Developers;
