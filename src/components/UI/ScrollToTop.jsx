import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Aparece el botón después de scrollear un poco
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="scroll-to-top"
            aria-label="Volver arriba"
        >
            <svg className="icon" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    );
};

export default ScrollToTop;
