// routes/orderRoutes.js
import express from 'express';
import { getAllOrdersWithItems, createOrder } from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/admin', verifyToken, getAllOrdersWithItems);
router.post('/', verifyToken, createOrder);

export default router;
