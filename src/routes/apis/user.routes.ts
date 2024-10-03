import express from 'express';
import userControllers from '../../controllers/user.controller';
import { validateUser } from '../../validators/user.validator';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware"
const userRoute = express.Router();

userRoute.get("/get-user", authenticate, userControllers.getAllUsers );

userRoute.get("/get-user/:id", authenticate, userControllers.getUserByID );

userRoute.put("/update-user/:id", authenticate, validateUser, validateHandler, userControllers.updateUser );

userRoute.delete("/delete-user/:id", authenticate, userControllers.deletedUser );

export default userRoute