import express from 'express';
import { checkAuth } from '../../middlewares/auth.middleware';
import { studentController } from './student.controller';

 const route = express.Router()

route.get('/', checkAuth('admin'), studentController.getAllStudents)
route.get('/:id', checkAuth('admin'), studentController.getSingleStudent)

export const studentsRouter = route
