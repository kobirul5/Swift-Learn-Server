import express from "express";
import { ContactControllers } from "./contact.controller";
import { checkAuth } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", ContactControllers.createContact);
router.get("/", checkAuth("admin"), ContactControllers.getAllContacts);
router.delete("/:id", checkAuth("admin"), ContactControllers.deleteContact);

export const ContactRoutes = router;
