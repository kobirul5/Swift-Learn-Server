import express from 'express'
import { createCourse, getAllCourse } from '../controllers/course.controllers'


export const courseRoute = express.Router()

courseRoute.get('/', getAllCourse)
courseRoute.post('/', createCourse)