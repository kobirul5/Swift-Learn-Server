import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { lectureService } from "./lecture.service";


const createLecture = asyncHandler(async (req: Request, res: Response) => {
  let lectureData = req.body;
  if (req.body.data) {
    try {
      lectureData = JSON.parse(req.body.data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // fallback or handle error
    }
  }

  const newLecture = await lectureService.createLectureService(lectureData, req.file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lecture created successfully",
    data: newLecture,
  });
});

const getAllLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await lectureService.getAllLectureService(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lectures retrieved successfully",
    data,
  });
});

const deleteLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await lectureService.deleteLectureService(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lecture deleted successfully",
    data,
  });
});

const getSingleLecture = asyncHandler(async (req: Request, res: Response) => {
  const data = await lectureService.getSingleLecture(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lecture retrieved successfully",
    data,
  });
});

const updateLecture = asyncHandler(async (req: Request, res: Response) => {
  let lectureData = req.body;
  if (req.body.data) {
    try {
      lectureData = JSON.parse(req.body.data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  const result = await lectureService.updateLectureService(req.params.id, lectureData, req.file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lecture updated successfully",
    data: result,
  });
})

export const lectureController = {
  createLecture,
  getAllLecture,
  deleteLecture,
  getSingleLecture,
  updateLecture
};
