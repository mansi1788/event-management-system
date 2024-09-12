import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../../erp/backend/controllers/authController.js";
import { isAdmin, requireSignIn } from "../../erp/backend/middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
