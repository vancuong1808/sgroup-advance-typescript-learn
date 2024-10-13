import express from 'express';
import bookControllers from '../../controllers/book.controller';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBook, validateBookTitle } from './../../validators/book.validator';
import { RequiredPermissions } from '../../middlewares/permission.middleware';
import { BookPermissions } from '../../constants/permission';
const bookRoute = express.Router();

bookRoute.get("/get-book", authenticate, RequiredPermissions( BookPermissions.VIEW_BOOK ) ,bookControllers.getAllBooks );

bookRoute.get("/get-book/:id", authenticate, RequiredPermissions( BookPermissions.VIEW_BOOK ), bookControllers.getBookByID );

bookRoute.get("/get-book/", authenticate, RequiredPermissions( BookPermissions.VIEW_BOOK ), validateBookTitle, validateHandler, bookControllers.getBookByName );

bookRoute.post("/create-book", authenticate, RequiredPermissions( BookPermissions.ADD_BOOK ), validateBook, validateHandler, bookControllers.addBook );

bookRoute.put("/update-book/:id", authenticate, RequiredPermissions( BookPermissions.UPDATE_BOOK ) ,validateBook, validateHandler, bookControllers.updateBook );

bookRoute.delete("/delete-book/:id", authenticate, RequiredPermissions( BookPermissions.DELETE_BOOK ), bookControllers.deletedBook );


export default bookRoute