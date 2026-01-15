import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import {
  createCourseService,
  getAllCourseService,
  getCourseByIdService,
  deleteCourseByIdService,
  updateCourseByIdService,
} from "./course.service";

const createCourse = asyncHandler(async (req: Request, res: Response) => {
  let courseData = req.body.data;

  if (req.body.data) {
    courseData = JSON.parse(req.body.data);
  }

  const result = await createCourseService(req.file, courseData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourse = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const searchTerm = req.query.searchTerm as string;
  const category = req.query.category as string;

  const result = await getAllCourseService(page, limit, searchTerm, category);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Courses retrieved successfully",
    data: result.data,
    meta: {
      page: result.pagination.page,
      limit: result.pagination.limit,
      total: result.pagination.total,
      totalPage: result.pagination.totalPages,
    },
  });
});

const getCourseById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await getCourseByIdService(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course retrieved successfully",
    data,
  });
});

const deleteCourseById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await deleteCourseByIdService(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course deleted successfully",
    data,
  });
});

const updateCourseById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let courseData = req.body.data;

  if (req.body.data) {
    courseData = JSON.parse(req.body.data);
  }

  const updatedCourse = await updateCourseByIdService(id, courseData, req.file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course updated successfully",
    data: updatedCourse,
  });
});

export {
  getAllCourse,
  createCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById,
};
