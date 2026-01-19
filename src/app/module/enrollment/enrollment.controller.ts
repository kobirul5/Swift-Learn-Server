import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { enrollmentService } from "./enrollment.service";

const getAllEnrollment = asyncHandler(async (req: Request, res: Response) => {
  const data = await enrollmentService.getAllEnrollmentService();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Enrollments retrieved successfully",
    data,
  });
});

const createEnrollment = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const data = await enrollmentService.createEnrollmentService({data: req.body, userId});
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Enrollment created successfully",
    data,
  });
});

const getStudentEnrollmentAndCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const courses = await enrollmentService.getStudentEnrollmentAndCourseService(studentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrolled courses fetched successfully",
      data: courses,
    });
  }
);

export const enrollmentController ={ getAllEnrollment, getStudentEnrollmentAndCourse, createEnrollment };
