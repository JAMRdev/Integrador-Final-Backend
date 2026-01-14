import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// Este componente protege las rutas que requieren login.
// Si no hay usuario, te manda a productos.
const ProtectedRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
        // Redirigimos a productos si no está logueado
        return <Navigate to="/products" replace />;
    }

    // Si hay usuario, mostramos el contenido de la ruta
    return <Outlet />;
};

export default ProtectedRoute;
