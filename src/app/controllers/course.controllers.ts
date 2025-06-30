import express, { Request, Response } from 'express'
import { Course } from '../models/course.model'

export const courseRoute = express.Router()


courseRoute.post('/', async(req: Request, res: Response)=>{
    const course = req.body;
    const data = await Course.create(course)
     res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    })
})
courseRoute.get('/', async(req: Request, res: Response)=>{

    const data = await Course.find()
     res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    })
})