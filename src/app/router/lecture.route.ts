import express from 'express'
import { createLecture, deleteLecture, getAllLecture } from '../controllers/lecture.controller'



export const lectureRoute = express.Router()

lectureRoute.post('/', createLecture)
lectureRoute.get('/:id', getAllLecture)
lectureRoute.delete('/:id', deleteLecture)

