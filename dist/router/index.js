"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_router_1 = require("../app/module/course/course.router");
const module_router_1 = require("../app/module/courseModule/module.router");
const lecture_route_1 = require("../app/module/lecture/lecture.route");
const user_router_1 = require("../app/module/users/user.router");
const enrollment_router_1 = require("../app/module/enrollment/enrollment.router");
const students_router_1 = require("../app/module/student/students.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_router_1.userRouter,
    },
    {
        path: "/courses",
        route: course_router_1.courseRoute,
    },
    {
        path: "/enrollment",
        route: enrollment_router_1.enrollmentRoute,
    },
    {
        path: "/students",
        route: students_router_1.studentsRouter,
    },
    {
        path: "/modules",
        route: module_router_1.moduleRoute,
    },
    {
        path: "/lecture",
        route: lecture_route_1.lectureRoute,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
