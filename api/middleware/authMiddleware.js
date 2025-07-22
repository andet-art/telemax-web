// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authenticate(req, res, next) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = payload;  // { id, name, email, iat, exp }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
