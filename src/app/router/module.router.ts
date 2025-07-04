
import express from 'express'
import { createModule, getAllModule } from '../controllers/module.controller'


export const moduleRoute = express.Router()

moduleRoute.get('/', getAllModule)
moduleRoute.post('/create', createModule)