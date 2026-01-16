import express from "express";
import { TestimonialController } from "./testimonial.controllers";
import { checkAuth } from "../../middlewares/auth.middleware";

const router = express.Router();

// Public routes
router.get("/approved", TestimonialController.getApprovedTestimonials);

// Authenticated routes
router.post("/", checkAuth("admin", "student"), TestimonialController.createTestimonial);
router.get("/", checkAuth("admin"), TestimonialController.getAllTestimonials);
router.get("/:id", checkAuth("admin"), TestimonialController.getSingleTestimonial);
router.patch("/:id/status", checkAuth("admin"), TestimonialController.updateTestimonialStatus);
router.delete("/:id", checkAuth("admin"), TestimonialController.deleteTestimonial);

export const TestimonialRoutes = router;
