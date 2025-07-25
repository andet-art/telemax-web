import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ✅ Add this

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

console.log('✅ Server is starting...');

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use('/api', authRoutes); // Includes /signup, /login, /profile
app.use('/api/products', productRoutes);
app.use('/api', userRoutes); // ✅ Mount user routes (includes /profile, /all-users)

// Serve static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for unmatched endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(config.port, () => {
  console.log(`✅ Server listening on port ${config.port}`);
});
