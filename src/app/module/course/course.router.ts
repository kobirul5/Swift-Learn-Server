import express from 'express'
import { createCourse, deleteCourseById, getAllCourse, getCourseById, updateCourseById } from './course.controllers'


export const courseRoute = express.Router()

courseRoute.get('/', getAllCourse)
courseRoute.post('/create-course', createCourse)
courseRoute.get('/:id', getCourseById)
courseRoute.delete('/:id', deleteCourseById)
courseRoute.patch('/:id', updateCourseById)