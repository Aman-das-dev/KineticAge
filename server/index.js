import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'KineticAge MERN REST API', timestamp: new Date() });
});

// Start Express Server
app.listen(PORT, async () => {
  console.log(`\n=================================================`);
  console.log(`🚀 KineticAge MERN REST API Server active on http://localhost:${PORT}`);
  console.log(`=================================================\n`);
  await connectDB();
});
