// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/worker');
const bookingRoutes = require('./routes/booking');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // In production, replace * with your deployed frontend URL
}));

// API Routes
app.use('/api/auth', authRoutes);       // Authentication (login/register)
app.use('/api/workers', workerRoutes);  // Worker management
app.use('/api/bookings', bookingRoutes); // Booking management

// Define server port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
