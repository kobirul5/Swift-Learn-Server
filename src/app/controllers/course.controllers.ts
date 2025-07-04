import { Request, Response } from 'express'
import { Course } from '../models/course.model'
import { asyncHandler } from '../utils/asyncHandler'
import { Module } from '../models/module.model';




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

    if(!data){
        res.status(401).json({
            success: false,
            massage: "Course Not Found"
        })
    }

    res.status(200).json({
        success: true,
        massage: "Get Course Successfully",
        data
    })
})

const deleteCourseById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

     const course = await Course.findById(id);

    if (!course) {
         res.status(404).json({
            success: false,
            message: "Course not found",
        });
        return
    }

    // Delete all modules associated with the course
    if (course.modules && course.modules.length > 0) {
        await Module.deleteMany({ _id: { $in: course.modules } });
    }

    const data = await Course.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        massage: "Delete Course Successfully",
        data
    })
})

export { getAllCourse, createCourse, getCourseById, deleteCourseById }