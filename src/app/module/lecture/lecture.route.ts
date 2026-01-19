import express from 'express'
import { checkAuth } from '../../middlewares/auth.middleware'
import { fileUploader } from '../../../helpers/fileUploader'
import { lectureController } from './lecture.controller'


export const route = express.Router()

route.post('/', checkAuth('admin'), fileUploader.uploadFile,    lectureController.createLecture)
route.get('/:id', lectureController.getAllLecture)
route.get('/single/:id', lectureController.getSingleLecture)
route.patch('/:id', checkAuth(), lectureController.updateLectureIsLocked)
route.delete('/:id', checkAuth('admin'),lectureController.deleteLecture)


export const lectureRoute = route;
