import dotenv from 'dotenv';
dotenv.config(); // Load env vars early

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ✅ If you have it
import orderRoutes from './routes/orderRoutes.js'; // ✅ Your new order route

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = config.port || 4000;

console.log('✅ Server is starting...');

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use('/api', authRoutes); // /signup, /login, /profile
app.use('/api/products', productRoutes);
app.use('/api', userRoutes); // Optional
app.use('/api/orders', orderRoutes); // ✅ Order routes here

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is listening on http://0.0.0.0:${PORT}`);
});
