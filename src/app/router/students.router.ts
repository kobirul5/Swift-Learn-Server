import express from 'express';
import { getAllStudents } from '../controllers/student.controller';

export const studentsRouter = express.Router()

studentsRouter.get('/', getAllStudents)