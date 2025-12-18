import express from 'express'
import { createCourse, deleteCourseById, getAllCourse, getCourseById, updateCourseById } from './course.controllers'


import { checkAuth } from '../../middlewares/auth.middleware'


export const courseRoute = express.Router()

courseRoute.get('/', getAllCourse)
courseRoute.post('/create-course', checkAuth('admin'), createCourse)
courseRoute.get('/:id', getCourseById)
courseRoute.delete('/:id', checkAuth('admin'), deleteCourseById)
courseRoute.patch('/:id', checkAuth('admin'), updateCourseById)