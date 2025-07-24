import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors(config.cors));
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
