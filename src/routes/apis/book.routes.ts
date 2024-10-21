import express from 'express';
import { Permissions } from '../../constants/permission';
import bookControllers from '../../controllers/book.controller';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware";
import { RequiredPermissions } from '../../middlewares/permission.middleware';
import { validateCategory } from '../../validators/category.validator';
import { validateBook, validateBookAuthor, validateBookCategory, validateBookTitle, validateRemoveBookCategory } from './../../validators/book.validator';
const bookRoute = express.Router();

bookRoute.get("/get-book", authenticate, RequiredPermissions( Permissions.VIEW_BOOK ) ,bookControllers.getAllBooks );

bookRoute.get("/get-book/:id", authenticate, RequiredPermissions( Permissions.VIEW_BOOK ), bookControllers.getBookByID );

bookRoute.get("/get-book-by-name", authenticate, RequiredPermissions( Permissions.VIEW_BOOK ), validateBookTitle, validateHandler, bookControllers.getBookByName );

bookRoute.get("/get-book-by-category", authenticate, RequiredPermissions( Permissions.VIEW_BOOK ), validateCategory, validateHandler, bookControllers.getBookByCategory );

bookRoute.get("/get-book-by-author", authenticate, RequiredPermissions( Permissions.VIEW_BOOK ), validateBookAuthor, validateHandler, bookControllers.getBookByAuthor );

bookRoute.post("/add-book", authenticate, RequiredPermissions( Permissions.ADD_BOOK ), validateBook, validateHandler, bookControllers.addBook );

bookRoute.put("/update-book/:id", authenticate, RequiredPermissions( Permissions.UPDATE_BOOK ) ,validateBook, validateHandler, bookControllers.updateBook );

bookRoute.delete("/delete-book/:id", authenticate, RequiredPermissions( Permissions.DELETE_BOOK ), bookControllers.deletedBook );

bookRoute.post("/assign-books-to-category", authenticate, RequiredPermissions( Permissions.ASSIGN_BOOK_TO_CATEGORY ), validateBookCategory, validateHandler, bookControllers.assignBookToCategory );

bookRoute.delete("/remove-book-from-category/:id", authenticate, RequiredPermissions( Permissions.REMOVE_BOOK_FROM_CATEGORY ), validateRemoveBookCategory, validateHandler, bookControllers.removeBookFromCategory );


export default bookRoute