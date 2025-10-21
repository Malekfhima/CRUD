const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const itemsRouter = require('./routes/items');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middlewares
const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN.split(',') }
  : { origin: true };
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/items', itemsRouter);

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).map((k) => err.errors[k].message);
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  // CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id format' });
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
