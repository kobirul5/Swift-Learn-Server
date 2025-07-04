"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoute = void 0;
const express_1 = __importDefault(require("express"));
const course_controllers_1 = require("../controllers/course.controllers");
exports.courseRoute = express_1.default.Router();
exports.courseRoute.get('/', course_controllers_1.getAllCourse);
exports.courseRoute.post('/create-course', course_controllers_1.createCourse);
exports.courseRoute.get('/:id', course_controllers_1.getCourseById);
