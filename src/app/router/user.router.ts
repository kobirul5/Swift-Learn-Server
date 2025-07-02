import express from 'express';
import { createUser, getAllUsers, getUserByEmail, loginUser, logout } from '../controllers/user.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

export const userRouter = express.Router()


userRouter.get('/', getAllUsers)
userRouter.post('/register', createUser)
userRouter.post('/login-user', loginUser)
userRouter.post('/logout', verifyJWT, logout)
userRouter.get('/:email', getUserByEmail)