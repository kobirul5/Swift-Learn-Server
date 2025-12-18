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
exports.createModuleService = exports.getAllModuleService = void 0;
const module_model_1 = require("./module.model");
const course_model_1 = require("../course/course.model");
const ApiError_1 = require("../../utils/ApiError");
const getAllModuleService = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const modules = yield module_model_1.Module.find({ course: courseId })
        .populate('lectures')
        .sort({ moduleNumber: 1 });
    return modules;
});
exports.getAllModuleService = getAllModuleService;
const createModuleService = (moduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield module_model_1.Module.create(moduleData);
    if (!data)
        throw new ApiError_1.ApiError(500, 'Module not created');
    yield course_model_1.Course.findByIdAndUpdate(data.course, { $addToSet: { modules: data._id } }, { new: true });
    return data;
});
exports.createModuleService = createModuleService;
