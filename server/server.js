import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to Database
connectDB();

// 1. Middlewares
app.use(express.json());
app.use(cookieParser());

// Update allowedOrigins with your new Live Frontend URL
const allowedOrigins = [
    'http://localhost:5173', 
    'https://secure-systems-live.onrender.com'
];

app.use(cors({ 
    origin: allowedOrigins, 
    credentials: true 
})); 

// 2. API Endpoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// 3. Start Server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));