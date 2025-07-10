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
exports.createEnrollment = exports.getStudentEnrollmentAndCourse = exports.getAllEnrollment = void 0;
const enrollment_model_1 = require("../models/enrollment.model");
const course_model_1 = require("../models/course.model");
const getAllEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield enrollment_model_1.Enrollment.find();
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    });
});
exports.getAllEnrollment = getAllEnrollment;
const createEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enData = req.body;
    const data = yield enrollment_model_1.Enrollment.create(enData);
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    });
});
exports.createEnrollment = createEnrollment;
const getStudentEnrollmentAndCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    // Get the student's enrollment data
    const enrollment = yield enrollment_model_1.Enrollment.find({ student: studentId });
    if (!enrollment) {
        res.status(404).json({
            success: false,
            message: 'Enrollment not found for this student',
        });
        return;
    }
    //  Extract all courseIds the student is enrolled in
    const courseIds = enrollment.flatMap(e => e.progress.map(p => p.course));
    console.log(courseIds, "------------------------");
    //  Get courses with modules populated
    const courses = yield course_model_1.Course.find({ _id: { $in: courseIds } })
        .populate({
        path: 'modules',
        populate: {
            path: 'lectures',
        },
    });
    //  Return enriched course data
    res.status(200).json({
        success: true,
        message: 'Enrolled courses fetched successfully',
        data: courses,
    });
});
exports.getStudentEnrollmentAndCourse = getStudentEnrollmentAndCourse;
