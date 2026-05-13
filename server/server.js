import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'; // 1. ADD THIS IMPORT

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// 1. Middlewares FIRST
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({ origin: allowedOrigins, credentials: true })); 

// 2. Routes SECOND
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(cors({ 
    origin: allowedOrigins, 
    credentials: true 
}));

// API Endpoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter); // 2. ADD THIS LINE

app.listen(port, () => console.log(`Server started on PORT: ${port}`));