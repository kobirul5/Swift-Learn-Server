import express from 'express';
import { getAllStudents } from '../student/student.controller';

import { checkAuth } from '../../middlewares/auth.middleware';

export const studentsRouter = express.Router()

studentsRouter.get('/', checkAuth('admin'), getAllStudents)