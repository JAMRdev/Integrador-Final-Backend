const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Error de validacion de Mongoose (que puso algo mal el usuario)
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors
        });
    }

    // Error de llave duplicada (ej: el email ya existe)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            message: `El ${field} ya está registrado`
        });
    }

    // Errores del token (JWT)
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expirado'
        });
    }

    // Si no es nada de lo de arriba, mandamos error de servidor y fue
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Error del servidor'
    });
};

export default errorHandler;
