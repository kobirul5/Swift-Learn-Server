import express from "express";
import { courseRoute } from "../app/course/course.router"
import { moduleRoute } from "../app/courseModule/module.router";
import { lectureRoute } from "../app/lecture/lecture.route";
import { userRouter } from "../app/users/user.router";
import { enrollmentRoute } from "../app/enrollment/enrollment.router";
import { studentsRouter } from "../app/student/students.router";

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
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
