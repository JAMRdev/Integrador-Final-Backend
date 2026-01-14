import express from 'express';
import { createOrder, getMyOrders, getOrder } from '../controllers/orders.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { orderValidation, validate } from '../utils/validators.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - shippingInfo
 *               - totalAmount
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               shippingInfo:
 *                 type: object
 *               totalAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/', orderValidation, validate, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for current user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get('/', getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get single order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 */
router.get('/:id', getOrder);

export default router;
