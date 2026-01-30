import express from "express";
import { moduleRoute } from "../app/module/courseModule/module.router";
import { lectureRoute } from "../app/module/lecture/lecture.route";
import { userRouter } from "../app/module/users/user.router";
import { studentsRouter } from "../app/module/student/students.router";
import { AuthRoutes } from "../app/module/auth/auth.route";
import { FaqRoutes } from "../app/module/faq/faq.route";
import { ContactRoutes } from "../app/module/contact/contact.route";
import { paymentRoutes } from "../app/module/payment/payment.router";
import { TestimonialRoutes } from "../app/module/testimonial/testimonial.router";
import { courseRouter } from "../app/module/course/course.router";
import { enrollmentRouter } from "../app/module/enrollment/enrollment.router";
import { InstructorRoutes } from "../app/module/instructor/instructor.router";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/courses",
    route: courseRouter,
  },
  {
    path: "/enrollment",
    route: enrollmentRouter,
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
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/testimonials",
    route: TestimonialRoutes,
  },
  {
    path: "/faqs",
    route: FaqRoutes,
  },
  {
    path: "/contacts",
    route: ContactRoutes,
  },
  {
    path: "/instructors",
    route: InstructorRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
