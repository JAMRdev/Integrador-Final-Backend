import Product from '../models/Product.js';

// Trae todo, si le pasas categoria filtra
export const getProducts = async (req, res, next) => {
    try {
        const { category } = req.query;

        const filter = category ? { category } : {};
        const products = await Product.find(filter).sort({ id: 1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// Para ver un producto por el id
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// Para filtrar por categoria desde la url
export const getProductsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;

        const products = await Product.find({ category }).sort({ id: 1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};
