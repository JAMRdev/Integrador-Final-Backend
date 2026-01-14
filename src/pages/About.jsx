import React from 'react';

const About = () => {
    return (
        <section className="container section-padding" style={{ paddingTop: '120px', textAlign: 'center' }}>
            <h2>Sobre Nosotros</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ marginBottom: '20px' }}>
                    En JAMR Store, nos apasiona la tecnología. Fundada en 2026, nuestra misión es democratizar el acceso a los dispositivos más innovadores del mercado.
                </p>
                <p>
                    Creemos en un futuro donde cada persona pueda potenciar su creatividad y productividad a través de herramientas de alta calidad.
                    Trabajamos directamente con los mejores fabricantes para asegurar que recibas productos auténticos y duraderos.
                </p>
            </div>
        </section>
    );
};
export default About;
