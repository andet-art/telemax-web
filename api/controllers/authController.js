import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { findUserByEmail, createUser, getUserById } from '../models/userModel.js';

export async function signup(req, res) {
  try {
    const {
      email,
      password,
      role = 'user',
      first_name,
      last_name,
      phone,
      date_of_birth,
      country,
      shipping_address,
      billing_address,
      age_verified,
      terms_accepted,
      privacy_accepted,
      marketing_consent,
    } = req.body;

    // Basic validation for required fields
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'First name, last name, email, and password are required' });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await createUser({
      email,
      passwordHash,
      role,
      first_name,
      last_name,
      phone,
      date_of_birth,
      country,
      shipping_address,
      billing_address,
      age_verified,
      terms_accepted,
      privacy_accepted,
      marketing_consent,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
}

export async function profile(req, res) {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      date_of_birth: user.date_of_birth,
      country: user.country,
      shipping_address: user.shipping_address,
      billing_address: user.billing_address,
      age_verified: user.age_verified,
      terms_accepted: user.terms_accepted,
      privacy_accepted: user.privacy_accepted,
      marketing_consent: user.marketing_consent,
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
