import express from 'express';
import { getAllStudents } from '../student/student.controller';

export const studentsRouter = express.Router()

studentsRouter.get('/', getAllStudents)