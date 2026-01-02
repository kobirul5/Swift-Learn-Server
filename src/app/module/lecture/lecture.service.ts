
import { Lecture } from './lecture.model';
import { Module } from '../courseModule/module.model';
import { ApiError } from '../../utils/ApiError';

const createLectureService = async (payload: any) => {
  const { module, title, videoUrl, notes } = payload;
  if (!module || !title || !videoUrl) {
    throw new ApiError(400, 'Module, title, and videoUrl are required');
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

export { createLectureService, getAllLectureService, deleteLectureService };
