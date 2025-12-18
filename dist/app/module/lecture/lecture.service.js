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
exports.deleteLectureService = exports.getAllLectureService = exports.createLectureService = void 0;
const lecture_model_1 = require("./lecture.model");
const module_model_1 = require("../courseModule/module.model");
const ApiError_1 = require("../../utils/ApiError");
const createLectureService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { module, title, videoUrl, notes } = payload;
    if (!module || !title || !videoUrl) {
        throw new ApiError_1.ApiError(400, 'Module, title, and videoUrl are required');
    }
    const newLecture = yield lecture_model_1.Lecture.create({ module, title, videoUrl, notes });
    yield module_model_1.Module.findByIdAndUpdate(module, { $push: { lectures: newLecture._id } }, { new: true });
    return newLecture;
});
exports.createLectureService = createLectureService;
const getAllLectureService = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lecture_model_1.Lecture.find({ module: moduleId });
});
exports.getAllLectureService = getAllLectureService;
const deleteLectureService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield lecture_model_1.Lecture.findByIdAndDelete(id);
    if (data) {
        yield module_model_1.Module.findByIdAndUpdate(data.module, { $pull: { lectures: data._id } }, { new: true });
    }
    return data;
});
exports.deleteLectureService = deleteLectureService;
