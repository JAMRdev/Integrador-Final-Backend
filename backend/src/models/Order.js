import mongoose from 'mongoose';

// Aca guardamos todo lo que compró el flaco
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido']
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    shippingInfo: {
        name: {
            type: String,
            required: [true, 'El nombre es requerido'],
            trim: true
        },
        address: {
            type: String,
            required: [true, 'La dirección es requerida'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'La ciudad es requerida'],
            trim: true
        },
        zip: {
            type: String,
            required: [true, 'El código postal es requerido'],
            trim: true
        },
        phone: {
            type: String,
            required: [true, 'El teléfono es requerido'],
            trim: true
        }
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: [true, 'El monto total es requerido'],
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
