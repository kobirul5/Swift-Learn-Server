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
exports.updateCourseById = exports.deleteCourseById = exports.getCourseById = exports.createCourse = exports.getAllCourse = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const course_service_1 = require("./course.service");
const createCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, course_service_1.createCourseService)(req.body);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Course created', data });
}));
exports.createCourse = createCourse;
const getAllCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, course_service_1.getAllCourseService)();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Get All Course Successfully', data });
}));
exports.getAllCourse = getAllCourse;
const getCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, course_service_1.getCourseByIdService)(id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Get Course Successfully', data });
}));
exports.getCourseById = getCourseById;
const deleteCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, course_service_1.deleteCourseByIdService)(id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Delete Course Successfully', data });
}));
exports.deleteCourseById = deleteCourseById;
const updateCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCourse = yield (0, course_service_1.updateCourseByIdService)(id, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Course updated successfully', data: updatedCourse });
}));
exports.updateCourseById = updateCourseById;
