import express from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.get("/get-me", checkAuth(), userController.getMe);
userRouter.get("/", checkAuth("admin"), userController.getAllUsers);
userRouter.get("/:id", checkAuth("admin"), userController.getUserById);
