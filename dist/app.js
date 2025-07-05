"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./app/router/user.router");
const enrollment_router_1 = require("./app/router/enrollment.router");
const course_router_1 = require("./app/router/course.router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const students_router_1 = require("./app/router/students.router");
const module_router_1 = require("./app/router/module.router");
const lecture_route_1 = require("./app/router/lecture.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://swift-learn-nu.vercel.app',
        'https://swift-learn-production.up.railway.app'
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/users/', user_router_1.userRouter);
app.use('/api/courses/', course_router_1.courseRoute);
app.use('/api/enrollment/', enrollment_router_1.enrollmentRoute);
app.use('/api/students/', students_router_1.studentsRouter);
app.use('/api/modules/', module_router_1.moduleRoute);
app.use('/api/lecture/', lecture_route_1.lectureRoute);
app.get('/', (req, res) => {
    res.send('Welcome Swift Learn Management');
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
    next();
});
exports.default = app;
