import { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import sendResponse from '../../../shared/sendResponse'
import {
    createCourseService,
    getAllCourseService,
    getCourseByIdService,
    deleteCourseByIdService,
    updateCourseByIdService,
} from './course.service'




const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const data = await createCourseService(req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Course created', data });
});

const getAllCourse = asyncHandler(async (req: Request, res: Response) => {
  const data = await getAllCourseService();
  sendResponse(res, { statusCode: 200, success: true, message: 'Get All Course Successfully', data });
});

const getCourseById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await getCourseByIdService(id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Get Course Successfully', data });
});

const deleteCourseById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await deleteCourseByIdService(id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Delete Course Successfully', data });
});

const updateCourseById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedCourse = await updateCourseByIdService(id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Course updated successfully', data: updatedCourse });
});


export { getAllCourse, createCourse, getCourseById, deleteCourseById, updateCourseById }