import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import { isAdmin, isVendor, requireSignIn } from "../middlewares/authMiddleware.js";

// Router object
const router = express.Router();

// Register route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// Test route (protected, admin only)
router.get("/admin-test", requireSignIn, isAdmin);

// Test route (protected, vendor only)
router.get("/vendor-test", requireSignIn, isVendor);

export default router;
