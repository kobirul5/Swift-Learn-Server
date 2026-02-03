import express from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { checkAuth } from "../../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.get("/get-me", checkAuth(), userController.getMe);
userRouter.get("/get-admins", checkAuth(), userController.getAdmins);
userRouter.patch("/update-me", checkAuth(), fileUploader.uploadFile, userController.updateMe);
userRouter.get("/", checkAuth("admin"), userController.getAllUsers);
userRouter.get("/:id", checkAuth("admin"), userController.getUserById);
