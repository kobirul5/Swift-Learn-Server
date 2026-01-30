import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { InstructorServices } from './instructor.service';
import { fileUploader } from '../../../helpers/fileUploader';

const createInstructor = asyncHandler(async (req: Request, res: Response) => {
  let payload;
  if (req.body.data) {
    try {
      payload = JSON.parse(req.body.data);
    } catch (error) {
       payload = req.body;
    }
  } else {
    payload = req.body;
  }

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    payload.image = uploadResult.Location;
  }

  const result = await InstructorServices.createInstructor(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Instructor created successfully',
    data: result,
  });
});

const getAllInstructors = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, search, expertise } = req.query;
  
  const query = {
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    search: search as string,
    expertise: expertise as string,
  };
  
  const result = await InstructorServices.getAllInstructors(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Instructors retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleInstructor = asyncHandler(async (req: Request, res: Response) => {
  const result = await InstructorServices.getSingleInstructor(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Instructor retrieved successfully',
    data: result,
  });
});

const updateInstructor = asyncHandler(async (req: Request, res: Response) => {
  let payload;
  if (req.body.data) {
     try {
      payload = JSON.parse(req.body.data);
    } catch (error) {
       payload = req.body;
    }
  } else {
    payload = req.body;
  }

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    payload.image = uploadResult.Location;
  }

  const result = await InstructorServices.updateInstructor(req.params.id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Instructor updated successfully',
    data: result,
  });
});

const deleteInstructor = asyncHandler(async (req: Request, res: Response) => {
  const result = await InstructorServices.deleteInstructor(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Instructor deleted successfully',
    data: result,
  });
});

export const InstructorController = {
  createInstructor,
  getAllInstructors,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
};
