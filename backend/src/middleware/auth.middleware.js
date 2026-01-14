import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Sacamos el token del autorization
            token = req.headers.authorization.split(' ')[1];

            // Aca vemos si el token es valido
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Agarramos al usuario de la base, menos la clave ojo
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            next();
        } catch (error) {
            console.error('Error en autenticación:', error);
            return res.status(401).json({
                success: false,
                message: 'No autorizado, token inválido'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado, no se proporcionó token'
        });
    }
};
