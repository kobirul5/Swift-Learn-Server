import express from 'express'
import { createCourse, deleteCourseById, getAllCourse, getCourseById, updateCourseById } from '../controllers/course.controllers'


export const courseRoute = express.Router()

courseRoute.get('/', getAllCourse)
courseRoute.post('/create-course', createCourse)
courseRoute.get('/:id', getCourseById)
courseRoute.delete('/:id', deleteCourseById)
courseRoute.put('/:id', updateCourseById)