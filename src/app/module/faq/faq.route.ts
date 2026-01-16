import express from "express";
import { FaqControllers } from "./faq.controller";
import { checkAuth } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", checkAuth("admin"), FaqControllers.createFaq);
router.get("/", FaqControllers.getAllFaqs);
router.get("/:id", FaqControllers.getFaqById);
router.patch("/:id", checkAuth("admin"), FaqControllers.updateFaq);
router.delete("/:id", checkAuth("admin"), FaqControllers.deleteFaq);

export const FaqRoutes = router;
