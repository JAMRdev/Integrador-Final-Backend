import mongoose from 'mongoose';

// El esquema de productos para la base
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'El nombre del producto es requerido'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    category: {
        type: String,
        required: [true, 'La categoría es requerida'],
        enum: {
            values: ['audio', 'gaming', 'tech'],
            message: 'La categoría debe ser: audio, gaming o tech'
        }
    },
    image: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true
    },
    stock: {
        type: Number,
        default: 100,
        min: [0, 'El stock no puede ser negativo']
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
