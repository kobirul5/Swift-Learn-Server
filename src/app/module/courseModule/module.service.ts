
import { Module } from './module.model';
import { Course } from '../course/course.model';
import { ApiError } from '../../utils/ApiError';

const getAllModuleService = async (courseId: string) => {
  const modules = await Module.find({ course: courseId })
    .populate('lectures')
    .sort({ moduleNumber: 1 });
  return modules;
};

const createModuleService = async (moduleData: any) => {
  const data = await Module.create(moduleData);
  if (!data) throw new ApiError(500, 'Module not created');

  await Course.findByIdAndUpdate(
    data.course,
    { $addToSet: { modules: data._id } },
    { new: true }
  );

  return data;
};

export { getAllModuleService, createModuleService };
