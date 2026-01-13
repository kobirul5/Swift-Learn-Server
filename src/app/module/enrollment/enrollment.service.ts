
import { Enrollment } from './enrollment.model';
import { Course } from '../course/course.model';
import { ApiError } from '../../utils/ApiError';

const getAllEnrollmentService = async () => {
  return await Enrollment.find();
};

const createEnrollmentService = async (payload: any) => {
  console.log(payload)
  const data = await Enrollment.create(payload);
  return data;
};

const getStudentEnrollmentAndCourseService = async (studentId: string) => {
  const enrollment = await Enrollment.find({ student: studentId });
  if (!enrollment) throw new ApiError(404, 'Enrollment not found for this student');

  const courseIds = enrollment.flatMap((e: any) => e.progress.map((p: any) => p.course));

  const courses = await Course.find({ _id: { $in: courseIds } }).populate({
    path: 'modules',
    populate: { path: 'lectures' },
  });

  return courses;
};

export { getAllEnrollmentService, createEnrollmentService, getStudentEnrollmentAndCourseService };
