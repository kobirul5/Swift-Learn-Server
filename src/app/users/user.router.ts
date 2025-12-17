import express from 'express';
import { createUser, getAllUsers, getUserByEmail, loginUser, logout, getUserForLogin } from '../users/user.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

export const userRouter = express.Router()


userRouter.get('/', getAllUsers)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', verifyJWT, logout)
userRouter.get('/login-user', verifyJWT, getUserForLogin)
userRouter.get('/:email', getUserByEmail)