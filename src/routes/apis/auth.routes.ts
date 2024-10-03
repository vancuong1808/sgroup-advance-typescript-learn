import express from "express"
import authController from "../../controllers/auth.controller.ts"
import { validateRegister, validateLogin } from "../../validators/auth.validator.ts"
import { validateHandler } from "../../handlers/validator.handler.ts"
const authRoute = express.Router();

authRoute.post("/register", validateRegister, validateHandler, authController.register );
authRoute.post("/login", validateLogin, validateHandler, authController.login );

export default authRoute