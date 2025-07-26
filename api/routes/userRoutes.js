import { Router } from 'express';
import { getProfile, getAllUsers } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js'; // ✅ FIXED
import { updateLastActive } from '../controllers/userController.js';
import { getActiveUserCount } from '../controllers/userController.js';

const router = Router();

router.post('/ping', verifyToken, updateLastActive);
router.get('/active-count', verifyToken, getActiveUserCount);
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
