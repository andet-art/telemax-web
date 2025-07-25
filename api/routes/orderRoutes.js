// orderRoutes.js
import express from 'express';
import { getAllOrdersWithItems } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/admin', verifyToken, getAllOrdersWithItems);

export default router;
