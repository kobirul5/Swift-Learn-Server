import express from 'express'
import { createLecture, deleteLecture, getAllLecture } from './lecture.controller'



import { checkAuth } from '../../middlewares/auth.middleware'


export const lectureRoute = express.Router()

lectureRoute.post('/', checkAuth('admin'), createLecture)
lectureRoute.get('/:id', getAllLecture)
lectureRoute.delete('/:id', checkAuth('admin'), deleteLecture)

