// routes/authRoutes.js
import { Router } from 'express';
import { signup, login, profile } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login',  login);
router.get('/profile', authenticate, profile);

export default router;
