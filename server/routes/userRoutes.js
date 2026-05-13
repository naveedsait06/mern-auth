import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';

const userRouter = express.Router();

// The frontend calls: backendUrl + '/api/user/data'
userRouter.get('/data', userAuth, getUserData);

export default userRouter;