import express from 'express';
import { 
    register, 
    login, 
    logout, 
    sendVerifyOtp, 
    verifyEmail,
    isAuthenticated, // Add this one
    sendResetOtp,
    resetPassword,
} 
from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js'; 

const authRouter = express.Router();

// Public Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

// Protected Routes (Require user to be logged in)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated); // Added this for the frontend check

authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;