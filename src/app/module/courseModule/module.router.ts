
import express from 'express'
import { createModule, getAllModule } from './module.controller'


import { checkAuth } from '../../middlewares/auth.middleware'


export const moduleRoute = express.Router()

moduleRoute.get('/:id', getAllModule)
moduleRoute.post('/create', checkAuth('admin'), createModule)
// moduleRoute.get('/lecture', createLecture)