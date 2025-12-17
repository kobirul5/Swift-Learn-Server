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
const course_model_1 = require("./course.model");
const asyncHandler_1 = require("../../utils/asyncHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const module_model_1 = require("../courseModule/module.model");
const createCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = req.body;
    const data = yield course_model_1.Course.create(course);
    res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    });
}));
exports.createCourse = createCourse;
const getAllCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield course_model_1.Course.find();
    res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    });
}));
exports.getAllCourse = getAllCourse;
const getCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield course_model_1.Course.findById(id);
    if (!data) {
        res.status(401).json({
            success: false,
            massage: "Course Not Found"
        });
    }
    res.status(200).json({
        success: true,
        massage: "Get Course Successfully",
        data
    });
}));
exports.getCourseById = getCourseById;
const deleteCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            success: false,
            message: "Invalid course ID format",
        });
        return;
    }
    const course = yield course_model_1.Course.findById(id);
    if (!course) {
        res.status(404).json({
            success: false,
            message: "Course not found",
        });
        return;
    }
    // Delete all modules associated with the course
    if (course.modules && course.modules.length > 0) {
        yield module_model_1.Module.deleteMany({ _id: { $in: course.modules } });
    }
    const data = yield course_model_1.Course.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        massage: "Delete Course Successfully",
        data
    });
}));
exports.deleteCourseById = deleteCourseById;
const updateCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    // Validate ObjectId
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            success: false,
            message: "Invalid course ID",
        });
        return;
    }
    // Find and update course
    const updatedCourse = yield course_model_1.Course.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!updatedCourse) {
        res.status(404).json({
            success: false,
            message: "Course not found",
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
    });
}));
exports.updateCourseById = updateCourseById;
