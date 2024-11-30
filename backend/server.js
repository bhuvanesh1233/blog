const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config({ path: path.join(__dirname, 'configuration/config.env') });

const app = express();
const postRoutes = require('./routes/posts');

// Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://vercel.live; object-src 'none';"
  );
  next();
});

// Middleware
const allowedOrigins = [
  process.env.UI_URI, 
  'https://blog-frontend-seven-wine.vercel.app'
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure 'uploads' folder exists

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB Connection error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Routes
app.use('/api/posts', postRoutes);

// Fallback for 404 routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
