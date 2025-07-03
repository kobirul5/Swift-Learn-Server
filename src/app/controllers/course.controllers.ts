import { Request, Response } from 'express'
import { Course } from '../models/course.model'
import { asyncHandler } from '../utils/asyncHandler'




const createCourse = asyncHandler(
    async (req: Request, res: Response) => {
        const course = req.body;
        const data = await Course.create(course)
        res.status(200).json({
            success: true,
            massage: "Get All Course Successfully",
            data
        })
    }
)
const getAllCourse = asyncHandler(async (req: Request, res: Response) => {

    const data = await Course.find()
    res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    })
})
const getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    const data = await Course.findById(id)
    res.status(200).json({
        success: true,
        massage: "Get Course Successfully",
        data
    })
})

export { getAllCourse, createCourse, getCourseById }