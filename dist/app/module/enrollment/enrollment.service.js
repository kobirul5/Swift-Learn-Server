"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentEnrollmentAndCourseService = exports.createEnrollmentService = exports.getAllEnrollmentService = void 0;
const enrollment_model_1 = require("./enrollment.model");
const course_model_1 = require("../course/course.model");
const ApiError_1 = require("../../utils/ApiError");
const getAllEnrollmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield enrollment_model_1.Enrollment.find();
});
exports.getAllEnrollmentService = getAllEnrollmentService;
const createEnrollmentService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield enrollment_model_1.Enrollment.create(payload);
    return data;
});
exports.createEnrollmentService = createEnrollmentService;
const getStudentEnrollmentAndCourseService = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollment = yield enrollment_model_1.Enrollment.find({ student: studentId });
    if (!enrollment)
        throw new ApiError_1.ApiError(404, 'Enrollment not found for this student');
    const courseIds = enrollment.flatMap((e) => e.progress.map((p) => p.course));
    const courses = yield course_model_1.Course.find({ _id: { $in: courseIds } }).populate({
        path: 'modules',
        populate: { path: 'lectures' },
    });
    return courses;
});
exports.getStudentEnrollmentAndCourseService = getStudentEnrollmentAndCourseService;
