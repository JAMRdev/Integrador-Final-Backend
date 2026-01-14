import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

export const registerValidation = [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

export const loginValidation = [
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').notEmpty().withMessage('La contraseña es requerida')
];

export const orderValidation = [
    body('items').isArray({ min: 1 }).withMessage('Debe haber al menos un producto'),
    body('items.*.productId').notEmpty().withMessage('ID del producto es requerido'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('El precio debe ser válido'),
    body('shippingInfo.name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('shippingInfo.address').trim().notEmpty().withMessage('La dirección es requerida'),
    body('shippingInfo.city').trim().notEmpty().withMessage('La ciudad es requerida'),
    body('shippingInfo.zip').trim().notEmpty().withMessage('El código postal es requerido'),
    body('shippingInfo.phone').trim().notEmpty().withMessage('El teléfono es requerido'),
    body('totalAmount').isFloat({ min: 0 }).withMessage('El monto total debe ser válido'),
    body('shippingPrice').isFloat({ min: 0 }).withMessage('El costo de envío debe ser válido')
];

export const contactValidation = [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('El asunto es requerido'),
    body('message').trim().notEmpty().withMessage('El mensaje es requerido')
];
