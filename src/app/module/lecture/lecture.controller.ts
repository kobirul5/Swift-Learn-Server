import { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler';
import sendResponse from '../../../shared/sendResponse'
import {
  createLectureService,
  getAllLectureService,
  deleteLectureService,
} from './lecture.service'

const createLecture = asyncHandler(async (req: Request, res: Response) => {
  const newLecture = await createLectureService(req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Lecture created successfully', data: newLecture });
})

const getAllLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await getAllLectureService(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Lectures retrieved successfully', data });
})

const deleteLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await deleteLectureService(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Lecture deleted successfully', data });
})

export { createLecture, getAllLecture, deleteLecture }