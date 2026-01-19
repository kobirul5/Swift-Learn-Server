/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lecture } from './lecture.model';
import { Module } from '../courseModule/module.model';
import { ApiError } from '../../utils/ApiError';
import { fileUploader } from '../../../helpers/fileUploader';

 const createLectureService = async (payload: any, file?: Express.Multer.File) => {
  const { module, title, notes } = payload;
  let { videoUrl } = payload;

  if (!module || !title) {
    throw new ApiError(400, 'Module and title are required');
  }

  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    videoUrl = uploadResult.Location;
  }

  if (!videoUrl) {
    throw new ApiError(400, 'Video file or videoUrl is required');
  }

  const newLecture = await Lecture.create({ module, title, videoUrl, notes });

  await Module.findByIdAndUpdate(module, { $push: { lectures: newLecture._id } }, { new: true });

  return newLecture;
};

 const getAllLectureService = async (moduleId: string) => {
  return await Lecture.find({ module: moduleId });
};

 const deleteLectureService = async (id: string) => {
  const data = await Lecture.findByIdAndDelete(id);
  if (data) {
    await Module.findByIdAndUpdate(data.module, { $pull: { lectures: data._id } }, { new: true });
  }
  return data;
};

const getSingleLecture = async (id: string) => {

  const lecture = await Lecture.findById(id);
  if (!lecture) {
    throw new ApiError(404, 'Lecture not found');
  }

  const result = await Lecture.findByIdAndUpdate(id, {isLocked: false}, { new: true });
  if (!result) {
    throw new ApiError(404, 'Lecture not found');
  }

  return result;
};

const updateLectureIsLocked = async (id: string) => {
  console.log(id);
  const result = await Lecture.findByIdAndUpdate(id, { isLocked: false }, { new: true });
  return result;
}


export const lectureService = {
  createLectureService,
  getAllLectureService,
  deleteLectureService,
  getSingleLecture,
  updateLectureIsLocked
};
