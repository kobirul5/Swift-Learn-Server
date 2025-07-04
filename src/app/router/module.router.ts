
import express from 'express'
import { createModule, getAllModule } from '../controllers/module.controller'


export const moduleRoute = express.Router()

moduleRoute.get('/:id', getAllModule)
moduleRoute.post('/create', createModule)
// moduleRoute.get('/lecture', createLecture)