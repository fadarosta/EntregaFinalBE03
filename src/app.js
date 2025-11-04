import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import config from './config/config.js';

import { serve, setup, specs } from './docs/swaggerOptions.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

// OWASP: Header security
app.use(helmet());

// OWASP: Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: "error", error: "Too many requests" }
});
app.use(limiter);

// Middleware uploads
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Conexión a DB
const connection = mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas
app.use('/api/docs', serve, setup(specs));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// errores 404
app.use('*', (req, res) => {
  res.status(404).send({ status: "error", error: "Route not found" });
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
  console.log(`Environment: ${config.env}`);
  console.log(`MongoDB: ${config.mongoUri}`);
});

export default app;