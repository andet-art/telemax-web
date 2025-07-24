// routes/userRoutes.js
import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.get('/profile', verifyToken, getProfile);

export default router;
