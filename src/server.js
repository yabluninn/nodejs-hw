import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/notes', notesRoutes);

// Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start
const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
