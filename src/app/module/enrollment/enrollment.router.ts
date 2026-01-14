import express from 'express'
import { createEnrollment, getAllEnrollment, getStudentEnrollmentAndCourse } from './enrollment.controller'



import { checkAuth } from '../../middlewares/auth.middleware'


export const enrollmentRoute = express.Router()

enrollmentRoute.get('/', checkAuth('admin'), getAllEnrollment)
enrollmentRoute.post('/', checkAuth(), createEnrollment)
enrollmentRoute.get('/:studentId', checkAuth('admin', 'student'), getStudentEnrollmentAndCourse)