import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors(config.cors));
app.use(express.json());
app.use('/api', authRoutes);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
