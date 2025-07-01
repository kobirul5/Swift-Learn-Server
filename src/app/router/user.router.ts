import express from 'express';
import { createUser, getAllUsers, getUserByEmail } from '../controllers/user.controller';

export const userRouter = express.Router()


userRouter.get('/', getAllUsers)
userRouter.post('/', createUser)
userRouter.get('/:email', getUserByEmail)