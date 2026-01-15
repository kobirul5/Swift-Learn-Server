import express from 'express'
import { createLecture, deleteLecture, getAllLecture } from './lecture.controller'



import { checkAuth } from '../../middlewares/auth.middleware'
import { fileUploader } from '../../../helpers/fileUploader'


export const lectureRoute = express.Router()

lectureRoute.post('/', checkAuth('admin'), fileUploader.uploadFile, createLecture)
lectureRoute.get('/:id', getAllLecture)
lectureRoute.delete('/:id', checkAuth('admin'), deleteLecture)

