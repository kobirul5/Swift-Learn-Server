import express from 'express'
import { createCourse, deleteCourseById, getAllCourse, getCourseById, updateCourseById } from './course.controllers'
import { fileUploader } from '../../../helpers/fileUploader';


import { checkAuth } from '../../middlewares/auth.middleware'


export const courseRoute = express.Router()

courseRoute.get('/', getAllCourse)
courseRoute.post('/create-course', checkAuth('admin'), fileUploader.uploadFile, createCourse)
courseRoute.get('/:id', getCourseById)
courseRoute.delete('/:id', checkAuth('admin'), deleteCourseById)
courseRoute.patch('/:id', fileUploader.uploadFile, checkAuth('admin'), updateCourseById)