import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();        

// Production cookie support behind Render's reverse proxy
app.set('trust proxy', 1); 

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed origins for Frontend connecting to Backend
const allowedOrigins = [
  'https://mern-auth-1-kl59.onrender.com',
  'http://localhost:5173'
];

// CORS configuration supporting cookies across domains
app.use(cors({ 
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
})); 

// API Routes
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start Server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));