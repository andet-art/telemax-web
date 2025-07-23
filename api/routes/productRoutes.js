import { Router } from 'express';
import { listProducts, getProduct, createNewProduct } from '../controllers/productController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
// Protect creation behind auth if needed:
router.post('/', authenticate, createNewProduct);

export default router;