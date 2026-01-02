import { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler';
import sendResponse from '../../../shared/sendResponse'
import { getAllStudentsService } from './student.service'

const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const { students, pagination } = await getAllStudentsService(page, limit);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: students.length === 0 ? 'No students found' : 'Students retrieved successfully',
    data: students,
    meta: pagination as any,
  });
})

export { getAllStudents }