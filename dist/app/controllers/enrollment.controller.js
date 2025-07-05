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
    // Step 1: Get the student's enrollment data
    const enrollment = yield enrollment_model_1.Enrollment.findOne({ student: studentId });
    if (!enrollment) {
        res.status(404).json({
            success: false,
            message: 'Enrollment not found for this student',
        });
        return;
    }
    // Step 2: Extract all courseIds the student is enrolled in
    const courseIds = enrollment.progress.map(p => p.course);
    // Step 3: Get courses with modules populated
    const courses = yield course_model_1.Course.find({ _id: { $in: courseIds } })
        .populate({
        path: 'modules',
        populate: {
            path: 'lectures',
        },
    });
    // Step 4: Return enriched course data
    res.status(200).json({
        success: true,
        message: 'Enrolled courses fetched successfully',
        data: courses,
    });
    // student id diye course gula ber korbo, 
    // req.body theke course diye kon course mil ase sete ber korbo
    // course er modde ta get korbo corser modde moude id gula thakbe segula ber korbo, 
    // module er modde lecture thakbe segula ber kore fron end a res ponse pathabo
});
exports.getStudentEnrollmentAndCourse = getStudentEnrollmentAndCourse;
