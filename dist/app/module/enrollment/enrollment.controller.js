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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnrollment = exports.getStudentEnrollmentAndCourse = exports.getAllEnrollment = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const enrollment_service_1 = require("./enrollment.service");
const getAllEnrollment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, enrollment_service_1.getAllEnrollmentService)();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Get Enrolment Successfully', data });
}));
exports.getAllEnrollment = getAllEnrollment;
const createEnrollment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, enrollment_service_1.createEnrollmentService)(req.body);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Enrollment created', data });
}));
exports.createEnrollment = createEnrollment;
const getStudentEnrollmentAndCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const courses = yield (0, enrollment_service_1.getStudentEnrollmentAndCourseService)(studentId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Enrolled courses fetched successfully', data: courses });
}));
exports.getStudentEnrollmentAndCourse = getStudentEnrollmentAndCourse;
