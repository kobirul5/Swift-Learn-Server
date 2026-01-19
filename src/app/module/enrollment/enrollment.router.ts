import express from 'express'




import { checkAuth } from '../../middlewares/auth.middleware'
import { enrollmentController } from './enrollment.controller'


 const route = express.Router()

route.get('/', checkAuth('admin'), enrollmentController.getAllEnrollment)
route.post('/', checkAuth(), enrollmentController.createEnrollment)
route.get('/:studentId', checkAuth('admin', 'student'), enrollmentController.getStudentEnrollmentAndCourse)

export const enrollmentRouter = route
