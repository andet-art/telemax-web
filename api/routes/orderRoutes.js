import express from 'express';
import { getAllOrdersWithItems, createOrder, getUserOrders } from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/admin', verifyToken, getAllOrdersWithItems);
router.get('/user', verifyToken, getUserOrders); // ✅ new route for users
router.post('/', verifyToken, createOrder);

export default router;
