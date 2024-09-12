import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'; // Make sure to import cors
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

// Configure environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
}));

// Middleware for parsing JSON
app.use(express.json());

// Middleware for logging requests
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);

// Test API endpoint
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ecommerce app</h1>');
});

// Port configuration
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
