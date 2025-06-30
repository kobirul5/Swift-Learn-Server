import express, { Request, Response } from 'express'
import { Enrollment } from '../models/enrollment.model'

export const enrollmentRoute = express.Router()




enrollmentRoute.get('/', async(req: Request, res: Response) => {
    const data = await Enrollment.find()
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
})


enrollmentRoute.get('/', async(req: Request, res: Response) => {
    const data = await Enrollment.find()
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
})
