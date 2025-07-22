// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = '1h';

export async function signup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email & password are required' });

  // Prevent duplicate email
  if (await findUserByEmail(email))
    return res.status(409).json({ error: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, passwordHash });

  // Issue a token immediately
  const token = jwt.sign({ id: user.id, name, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
  res.json({ token, user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email & password are required' });

  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, name: user.name, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
  res.json({ token, user: { id: user.id, name: user.name, email } });
}

export async function profile(req, res) {
  // authMiddleware set req.user
  res.json({ user: req.user });
}
