/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { Course } from './course.model';
import { Module } from '../courseModule/module.model';
import { ApiError } from '../../utils/ApiError';
import { fileUploader } from '../../../helpers/fileUploader';
import { ICourse } from './course.interface';

const createCourseService = async (file: any, courseData: any) => {
  if (file) {
    const uploadedFile = await fileUploader.uploadToCloudinary(file);
    courseData.thumbnail = uploadedFile.Location;
  }
  const data = await Course.create(courseData);
  return data;
};

const getAllCourseService = async (
  page: number,
  limit: number,
  searchTerm?: string,
  category?: string,
  isFeatured?: string
) => {
  const skip = (page - 1) * limit;

  // Build query
  const query: any = {};

  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { instructor: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (category && category !== 'All') {
    query.category = category;
  }

  if (isFeatured) {
    query.isFeatured = isFeatured === 'true';
  }

  const [data, total] = await Promise.all([
    Course.find(query).skip(skip).limit(limit),
    Course.countDocuments(query)
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getCourseByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid course ID');
  }
  const data = await Course.findById(id)
    .populate({
      path: 'modules',
      options: { sort: { moduleNumber: 1 } },
      populate: {
        path: 'lectures',       // Module schema এর field
        options: { sort: { lectureNumber: 1 } }, // optional order
      },
    });

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

const updateCourseByIdService = async (id: string, updatedData: ICourse, file?: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  if (file) {
    const uploadedFile = await fileUploader.uploadToCloudinary(file);
    updatedData.thumbnail = uploadedFile.Location;
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
