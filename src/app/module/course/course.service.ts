import mongoose from 'mongoose'
import { Course } from './course.model';
import { Module } from '../courseModule/module.model';
import { ApiError } from '../../utils/ApiError';

const createCourseService = async (courseData: any) => {
  const data = await Course.create(courseData);
  return data;
};

const getAllCourseService = async () => {
  return await Course.find();
};

const getCourseByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid course ID');
  }
  const data = await Course.findById(id);
  if (!data) throw new ApiError(404, 'Course Not Found');
  return data;
};

const deleteCourseByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid course ID format');
  }

  const course = await Course.findById(id);
  if (!course) throw new ApiError(404, 'Course not found');

  if (course.modules && course.modules.length > 0) {
    await Module.deleteMany({ _id: { $in: course.modules } });
  }

  const data = await Course.findByIdAndDelete(id);
  return data;
};

const updateCourseByIdService = async (id: string, updatedData: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedCourse) throw new ApiError(404, 'Course not found');
  return updatedCourse;
};

export {
  createCourseService,
  getAllCourseService,
  getCourseByIdService,
  deleteCourseByIdService,
  updateCourseByIdService,
};
