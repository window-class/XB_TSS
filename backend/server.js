import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import stockInRoutes from './routes/stockInRoutes.js';
import stockOutRoutes from './routes/stockOutRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use('/api/auth', authRoutes);
app.use('/api', stockInRoutes);
app.use('/api', stockOutRoutes);
app.use('/api', reportRoutes);

const PORT = process.env.PORT || 7070;

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`DB Connected on: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server runs on: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error running server:', error);
  });

