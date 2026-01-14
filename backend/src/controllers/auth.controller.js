import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Funcion para crear el token, no tocar
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Aca registramos un usuario nuevo
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Primero vemos si ya existe el mail
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        // Si no existe, lo creamos
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// Para entrar a la cuenta
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // A ver si existe el flaco
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Aca comparamos la pass, ojala funcione
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// Esto es para saber quien soy
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
