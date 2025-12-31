import express from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/auth.middleware";

const router = express.Router();


// user registration - removing image upload middleware for simplicity/compatibility unless requested
router.post("/register", AuthController.createUser);

// user login route
router.post("/login", AuthController.loginUser);

//change password
router.put(
    "/change-password",
    checkAuth(),
    AuthController.changePassword
);

//reset password
router.post("/reset-password", checkAuth(), AuthController.resetPassword);

//forgot password
router.post("/forgot-password", AuthController.forgotPassword);

//verify-otp (forgot password)
router.post("/verify-otp", checkAuth(), AuthController.verifyOtp);

//verify-otp (email)
router.post("/email-verify-otp", AuthController.verifyEmailOtp);
router.post("/logout", checkAuth(), AuthController.logoutUser);

export const AuthRoutes = router;
