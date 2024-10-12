import { validateCategory } from './../../validators/category.validator';
import express from 'express';
import categoryControllers from '../../controllers/category.controller';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware"
const categoryRoute = express.Router();

categoryRoute.get("/get-category", authenticate, categoryControllers.getAllCategories );

categoryRoute.get("/get-category/:id", authenticate, categoryControllers.getCategoryByID );

categoryRoute.get("/get-category/", authenticate, validateCategory, validateHandler, categoryControllers.getCategoryByName );

categoryRoute.post("/create-category", authenticate, validateCategory, validateHandler, categoryControllers.addCategory );

categoryRoute.put("/update-category/:id", authenticate, validateCategory, validateHandler, categoryControllers.updateCategory );

categoryRoute.delete("/delete-category/:id", authenticate, categoryControllers.deleteCategory );


export default categoryRoute