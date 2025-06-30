import express from 'express'
import { getAllEnrollment } from '../controllers/enrollment.controller'



export const enrollmentRoute = express.Router()

enrollmentRoute.get('/', getAllEnrollment)