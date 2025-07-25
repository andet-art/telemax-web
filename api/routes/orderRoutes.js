import express from 'express';
import { getAllOrdersWithItems } from '../controllers/orderController.js'; // ✅ CORRECT
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// ✅ Admin route to get all orders with product info
router.get('/admin', verifyToken, getAllOrdersWithItems);

export default router;
