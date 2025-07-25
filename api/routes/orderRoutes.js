// routes/orderRoutes.js
import express from 'express';
import { getAllOrdersWithItems, createOrder } from '../controllers/orderController.js';

const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/admin', verifyToken, getAllOrdersWithItems);
router.post('/', verifyToken, createOrder);

export default router;
