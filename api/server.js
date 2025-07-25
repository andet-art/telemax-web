// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = config.port || 4000;

console.log('✅ Server is starting...');

app.use(cors(config.cors));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is listening on http://0.0.0.0:${PORT}`);
});
