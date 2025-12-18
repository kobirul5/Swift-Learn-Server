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
exports.updateCourseByIdService = exports.deleteCourseByIdService = exports.getCourseByIdService = exports.getAllCourseService = exports.createCourseService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const course_model_1 = require("./course.model");
const module_model_1 = require("../courseModule/module.model");
const ApiError_1 = require("../../utils/ApiError");
const createCourseService = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield course_model_1.Course.create(courseData);
    return data;
});
exports.createCourseService = createCourseService;
const getAllCourseService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.find();
});
exports.getAllCourseService = getAllCourseService;
const getCourseByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.ApiError(400, 'Invalid course ID');
    }
    const data = yield course_model_1.Course.findById(id);
    if (!data)
        throw new ApiError_1.ApiError(404, 'Course Not Found');
    return data;
});
exports.getCourseByIdService = getCourseByIdService;
const deleteCourseByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.ApiError(400, 'Invalid course ID format');
    }
    const course = yield course_model_1.Course.findById(id);
    if (!course)
        throw new ApiError_1.ApiError(404, 'Course not found');
    if (course.modules && course.modules.length > 0) {
        yield module_model_1.Module.deleteMany({ _id: { $in: course.modules } });
    }
    const data = yield course_model_1.Course.findByIdAndDelete(id);
    return data;
});
exports.deleteCourseByIdService = deleteCourseByIdService;
const updateCourseByIdService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiError_1.ApiError(400, 'Invalid course ID');
    }
    const updatedCourse = yield course_model_1.Course.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!updatedCourse)
        throw new ApiError_1.ApiError(404, 'Course not found');
    return updatedCourse;
});
exports.updateCourseByIdService = updateCourseByIdService;
