
import { Lecture } from './lecture.model';
import { Module } from '../courseModule/module.model';
import { ApiError } from '../../utils/ApiError';

import { fileUploader } from '../../../helpers/fileUploader';

export const createLectureService = async (payload: any, file?: Express.Multer.File) => {
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

export const getAllLectureService = async (moduleId: string) => {
  return await Lecture.find({ module: moduleId });
};

export const deleteLectureService = async (id: string) => {
  const data = await Lecture.findByIdAndDelete(id);
  if (data) {
    await Module.findByIdAndUpdate(data.module, { $pull: { lectures: data._id } }, { new: true });
  }
  return data;
};
