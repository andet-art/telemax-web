import { Router } from 'express';
import { getProfile, getAllUsers } from '../controllers/userController.js';

const verifyToken = require('../middleware/verifyToken');

const router = Router();

// ✅ Normal user profile
router.get('/profile', verifyToken, getProfile);

// ✅ Admin: Get all users
router.get('/all-users', verifyToken, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, getAllUsers);

export default router;
