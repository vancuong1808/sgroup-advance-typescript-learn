import express from 'express';
import userControllers from '../../controllers/user.controller';
import { validateUser } from '../../validators/user.validator';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware"
import { RequiredPermissions } from '../../middlewares/permission.middleware';
import { UserPermissions } from '../../constants/permission';
const userRoute = express.Router();

userRoute.get("/get-user", authenticate, RequiredPermissions( UserPermissions.VIEW_USER ), userControllers.getAllUsers );

userRoute.get("/get-user/:id", authenticate, RequiredPermissions( UserPermissions.VIEW_USER ), userControllers.getUserByID );

userRoute.put("/update-user/:id", authenticate, RequiredPermissions( UserPermissions.UPDATE_USER ), validateUser, validateHandler, userControllers.updateUser );

userRoute.delete("/delete-user/:id", authenticate, RequiredPermissions( UserPermissions.DELETE_USER ), userControllers.deletedUser );

export default userRoute