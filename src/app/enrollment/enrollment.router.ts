import express from 'express'
import { createEnrollment, getAllEnrollment, getStudentEnrollmentAndCourse } from '../enrollment/enrollment.controller'



export const enrollmentRoute = express.Router()

enrollmentRoute.get('/', getAllEnrollment)
enrollmentRoute.post('/', createEnrollment)
enrollmentRoute.get('/:studentId', getStudentEnrollmentAndCourse)