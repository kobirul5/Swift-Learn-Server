import express from 'express'
import { createCourse, deleteCourseById, getAllCourse, getAllFeaturedCourses, getCourseById, updateCourseById } from './course.controllers'
import { fileUploader } from '../../../helpers/fileUploader';


import { checkAuth } from '../../middlewares/auth.middleware'


const route = express.Router()

route.get('/', getAllCourse)
route.get('/featured', getAllFeaturedCourses)
route.post('/create-course', checkAuth('admin'), fileUploader.uploadFile, createCourse)
route.get('/:id', getCourseById)
route.delete('/:id', checkAuth('admin'), deleteCourseById)
route.patch('/:id', fileUploader.uploadFile, checkAuth('admin'), updateCourseById)

export const courseRouter = route