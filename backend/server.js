import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import eventRoutes from './routes/event.js';


dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
}));

app.use(express.json());

app.use(morgan('dev'));

app.use('/events', eventRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to ecommerce app</h1>');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
