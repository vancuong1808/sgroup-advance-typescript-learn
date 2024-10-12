import { validateBook, validateBookTitle } from './../../validators/book.validator';
import express from 'express';
import bookControllers from '../../controllers/book.controller';
import { validateHandler } from '../../handlers/validator.handler';
import { authenticate } from "../../middlewares/auth.middleware"
const bookRoute = express.Router();

bookRoute.get("/get-book", authenticate, bookControllers.getAllBooks );

bookRoute.get("/get-book/:id", authenticate, bookControllers.getBookByID );

bookRoute.get("/get-book/", authenticate, validateBookTitle, validateHandler, bookControllers.getBookByName );

bookRoute.post("/create-book", authenticate, validateBook, validateHandler, bookControllers.addBook );

bookRoute.put("/update-book/:id", authenticate, validateBook, validateHandler, bookControllers.updateBook );

bookRoute.delete("/delete-book/:id", authenticate, bookControllers.deletedBook );


export default bookRoute