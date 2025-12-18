import express from "express";
import { courseRoute } from "../app/module/course/course.router"
import { moduleRoute } from "../app/module/courseModule/module.router";
import { lectureRoute } from "../app/module/lecture/lecture.route";
import { userRouter } from "../app/module/users/user.router";
import { enrollmentRoute } from "../app/module/enrollment/enrollment.router";
import { studentsRouter } from "../app/module/student/students.router";
import { AuthRoutes } from "../app/module/auth/auth.route";



const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/courses",
    route: courseRoute,
  },
  {
    path: "/enrollment",
    route: enrollmentRoute,
  },
  {
    path: "/students",
    route: studentsRouter,
  },
  {
    path: "/modules",
    route: moduleRoute,
  },
  {
    path: "/lecture",
    route: lectureRoute,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
