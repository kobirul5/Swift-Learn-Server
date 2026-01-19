
import { Module } from './module.model';
import { Course } from '../course/course.model';
import { ApiError } from '../../utils/ApiError';

const getAllModuleService = async (courseId: string) => {
  const modules = await Module.find({ course: courseId })
    .populate('lectures')
    .sort({ moduleNumber: 1 });
  return modules;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateModuleService = async (id: string, payload: any) => {
  const result = await Module.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new ApiError(404, "Module not found");
  }
  return result;
};

const deleteModuleService = async (id: string) => {
  const result = await Module.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(404, "Module not found");
  }

  await Course.findByIdAndUpdate(
    result.course,
    { $pull: { modules: result._id } },
    { new: true }
  );
  return result;
};

export const moduleService = { getAllModuleService, createModuleService, updateModuleService, deleteModuleService };
