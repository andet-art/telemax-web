import dotenv from 'dotenv';
dotenv.config(); // 👈 Load .env variables before anything else

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ✅ Add this line

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', userRoutes); // ✅ Mount profile route

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
