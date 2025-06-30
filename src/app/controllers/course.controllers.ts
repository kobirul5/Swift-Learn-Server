import { Request, Response } from 'express'
import { Course } from '../models/course.model'




const createCourse = async(req: Request, res: Response)=>{
    const course = req.body;
    const data = await Course.create(course)
     res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    })
}
const getAllCourse = async(req: Request, res: Response)=>{

    const data = await Course.find()
     res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    })
}

export {getAllCourse, createCourse}