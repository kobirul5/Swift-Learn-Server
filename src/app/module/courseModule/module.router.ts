
import express from 'express'
import { checkAuth } from '../../middlewares/auth.middleware'
import { moduleController } from './module.controller'


export const router = express.Router()


router.get('/all-module/:courseId', checkAuth(), moduleController.getAllModuleBYCourseId)
router.get('/:id', moduleController.getAllModule)
router.post('/create', checkAuth('admin'), moduleController.createModule)
router.patch('/update/:id', checkAuth('admin'), moduleController.updateModule)
router.delete('/:id', checkAuth('admin'), moduleController.deleteModule)

// moduleRoute.get('/lecture', createLecture)

export const moduleRoute = router