import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { studentService } from "./student.service";


const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const searchTerm = req.query.searchTerm as string;
  const status = req.query.status as "active" | "inactive" | "banned";

  const { students, pagination } = await studentService.getAllStudentsService({
    page,
    limit,
    searchTerm,
    status,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message:
      students.length === 0
        ? "No students found"
        : "Students retrieved successfully",
    data: students,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: pagination as any,
  });
});

const getSingleStudent = asyncHandler(async (req: Request, res: Response) => {
  const studentId = req.params.id;

  const student = await studentService.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student retrieved successfully",
    data: student,
  });

});

export const studentController = {
  getAllStudents,
  getSingleStudent,
};
