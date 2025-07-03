import express from 'express'
import { createCourse, getAllCourse, getCourseById } from '../controllers/course.controllers'


export const courseRoute = express.Router()

courseRoute.get('/', getAllCourse)
courseRoute.post('/create-course', createCourse)
courseRoute.get('/:id', getCourseById)