import Order from '../models/Order.js';

// Para guardar una orden nueva despues de pagar
export const createOrder = async (req, res, next) => {
    try {
        const { items, shippingInfo, totalAmount, shippingPrice } = req.body;

        const order = await Order.create({
            userId: req.user._id,
            items,
            shippingInfo,
            totalAmount,
            shippingPrice
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Trae todas mis ordenes, la ultima arriba de todo
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .populate('items.productId', 'name image');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// Para ver una orden solita por el id
export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.productId', 'name image');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada'
            });
        }

        // Ojo aca, chequear que sea el mismo usuario
        if (order.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No autorizado para ver esta orden'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};
