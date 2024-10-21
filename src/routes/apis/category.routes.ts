import { validateCategory } from './../../validators/category.validator';
import express from 'express';
import categoryControllers from '../../controllers/category.controller';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware"
import { RequiredPermissions } from '../../middlewares/permission.middleware';
import { Permissions } from '../../constants/permission';
const categoryRoute = express.Router();

categoryRoute.get("/get-category", authenticate, RequiredPermissions( Permissions.VIEW_CATEGORY ), categoryControllers.getAllCategories );

categoryRoute.get("/get-category/:id", authenticate, RequiredPermissions( Permissions.VIEW_CATEGORY ), categoryControllers.getCategoryByID );

categoryRoute.get("/get-category-by-name", authenticate, RequiredPermissions( Permissions.VIEW_CATEGORY ), validateCategory, validateHandler, categoryControllers.getCategoryByName );

categoryRoute.post("/add-category", authenticate, RequiredPermissions( Permissions.ADD_CATEGORY ), validateCategory, validateHandler, categoryControllers.addCategory );

categoryRoute.put("/update-category/:id", authenticate, RequiredPermissions( Permissions.UPDATE_CATEGORY ), validateCategory, validateHandler, categoryControllers.updateCategory );

categoryRoute.delete("/delete-category/:id", authenticate, RequiredPermissions( Permissions.DELETE_CATEGORY ), categoryControllers.deleteCategory );



export default categoryRoute