import { validateCategory } from './../../validators/category.validator';
import express from 'express';
import categoryControllers from '../../controllers/category.controller';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware"
import { RequiredPermissions } from '../../middlewares/permission.middleware';
import { CategoryPermissions } from '../../constants/permission';
const categoryRoute = express.Router();

categoryRoute.get("/get-category", authenticate, RequiredPermissions( CategoryPermissions.VIEW_CATEGORY ), categoryControllers.getAllCategories );

categoryRoute.get("/get-category/:id", authenticate, RequiredPermissions( CategoryPermissions.VIEW_CATEGORY ), categoryControllers.getCategoryByID );

categoryRoute.get("/get-category/", authenticate, RequiredPermissions( CategoryPermissions.VIEW_CATEGORY ), validateCategory, validateHandler, categoryControllers.getCategoryByName );

categoryRoute.post("/create-category", authenticate, RequiredPermissions( CategoryPermissions.ADD_CATEGORY ), validateCategory, validateHandler, categoryControllers.addCategory );

categoryRoute.put("/update-category/:id", authenticate, RequiredPermissions( CategoryPermissions.UPDATE_CATEGORY ), validateCategory, validateHandler, categoryControllers.updateCategory );

categoryRoute.delete("/delete-category/:id", authenticate, RequiredPermissions( CategoryPermissions.DELETE_CATEGORY ), categoryControllers.deleteCategory );


export default categoryRoute