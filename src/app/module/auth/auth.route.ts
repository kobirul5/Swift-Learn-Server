import express from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/auth.middleware";
import { checkBlockedStatus } from "../../middlewares/checkBlock";
// import multer from "multer"; // Removing multer dependence for now as setup was complex in snippet

const router = express.Router();

// Configure multer for user profile updates
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const userImageUpload = upload.fields([
//   { name: "profileImage", maxCount: 1 },
//   { name: "driverLicense", maxCount: 10 },
// ]);

// user registration - removing image upload middleware for simplicity/compatibility unless requested
router.post("/register", AuthController.createUser);

// user login route
router.post("/login", AuthController.loginUser);

// user logout - client side usually handles token removal, or we can blacklist token
// router.post("/logout", AuthController.logoutUser); // Controller didn't implement logoutUser in my adaptation as it was cookie based mostly

//change password
router.put(
    "/change-password",
    checkAuth(),
    checkBlockedStatus,
    AuthController.changePassword
);

//reset password
router.post("/reset-password", AuthController.resetPassword);

//forgot password
router.post("/forgot-password", AuthController.forgotPassword);

//verify-otp (forgot password)
router.post("/verify-otp", AuthController.verifyForgotPasswordOtp);

//verify-otp (email)
router.post("/email-verify-otp", AuthController.verifyEmailOtp);

export const AuthRoutes = router;
