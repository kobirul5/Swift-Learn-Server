import express from "express";
import { getAllUsers, getUserByEmail, getMe } from "./user.controller";
import { checkAuth } from "../../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.get("/get-me", checkAuth("admin", "student"), getMe);
userRouter.get("/", checkAuth("admin"), getAllUsers);
userRouter.get("/:email", checkAuth("admin"), getUserByEmail);
