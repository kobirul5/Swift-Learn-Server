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
  sendResponse(res, { statusCode: 200, success: true, message: 'Create lecture Successfully', data: newLecture });
})

const getAllLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await getAllLectureService(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'get all Lecture successfully', data });
})

const deleteLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await deleteLectureService(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'delete successfully', data });
})

export { createLecture, getAllLecture, deleteLecture }