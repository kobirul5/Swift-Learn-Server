import express from 'express';
import { createUser, getAllUsers, getUserByEmail, loginUser, logout, getUserForLogin } from './user.controller';
import { checkAuth } from '../../middlewares/auth.middleware';

export const userRouter = express.Router()


userRouter.get('/', getAllUsers)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', checkAuth(), logout)
userRouter.get('/login-user', checkAuth(), getUserForLogin)
userRouter.get('/:email', getUserByEmail)