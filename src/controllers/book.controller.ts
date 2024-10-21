import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../errors/customError.ts";
import { Result } from '../base/result.base.ts';
import { BookCategoryBody, BookBody, CategoryBody } from "../typings/custom.interface.ts";
import bookService from "../services/book.service.ts";

const getAllBooks : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const getAllBooksResult : Result = await bookService.getAllBooks();
        responseHandler.ok( res, getAllBooksResult.message, getAllBooksResult.data || {} );
    } catch( error : unknown ) {
        next( error );
    }
}

const getBookByID : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const bookId : number = Number.parseInt( req.params.id );
        if ( !bookId || bookId <= 0 ) {
            next( new badRequestError("BookId not valid") );
        }
        const getBookByIdResult : Result = await bookService.getBookByID( bookId );
        responseHandler.ok( res, getBookByIdResult.message, getBookByIdResult.data || {} );
    } catch (error : unknown) {
        next( error );
    }
}

const getBookByName : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const title : string = req.body.title; 
        const getBookByNameResult : Result = await bookService.getBookByName( title );
        responseHandler.ok( res, getBookByNameResult.message, getBookByNameResult.data || {} );
    } catch (error : unknown) {
        next( error );
    }
}

const getBookByAuthor : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const author : string = req.body.author;
        const getBookByAuthorResult : Result = await bookService.getBookByAuthor( author );
        responseHandler.ok( res, getBookByAuthorResult.message, getBookByAuthorResult.data || {} );
    } catch (error : unknown) {
        next( error );
    }
}

const getBookByCategory : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categoryBody : CategoryBody = {
            categoryName: req.body.categoryName,
        }
        const getBookByCategoryResult : Result = await bookService.getBookByCategory( categoryBody );
        responseHandler.ok( res, getBookByCategoryResult.message, getBookByCategoryResult.data || {} );
    } catch (error : unknown) {
        next( error );
    }
}

const addBook : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const bookBody : BookBody = {
            title: req.body.title,
            author: req.body.author
        }
        const addBookResult : Result = await bookService.addBook( bookBody );
        responseHandler.created( res, addBookResult.message, addBookResult.data || {} );
    } catch ( error : unknown ) {
        next( error );
    }
}

const updateBook : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const bookId : number = Number.parseInt( req.params.id );
        if ( !bookId || bookId <= 0 ) {
            next( new badRequestError("BookId not valid") );
        }
        const bookBody : BookBody = {
            title: req.body.title,
            author: req.body.author
        }
        const updateBookResult : Result = await bookService.updateBook( bookId, bookBody );
        responseHandler.ok( res, updateBookResult.message, updateBookResult.data || {} );
    } catch ( error : unknown ) {
        next( error );
    }
}

const deletedBook : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const bookId : number = Number.parseInt( req.params.id );
        if ( !bookId || bookId <= 0 ) {
            next( new badRequestError("BookId not valid") );
        }
        const deletedBookResult : Result = await bookService.deleteBook( bookId );
        responseHandler.ok( res, deletedBookResult.message, deletedBookResult.data || {} );
    } catch ( error : unknown ) {
        next( error );
    }
}

const assignBookToCategory : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const categoryId : number = Number.parseInt( req.body.id );
        if ( !categoryId || categoryId <= 0 ) {
            next( new badRequestError("CategoryId not valid") );
        }
        const bookId : number = Number.parseInt( req.body.id );
        if ( !bookId || bookId <= 0 ) {
            next( new badRequestError("BookId not valid") );
        }
        const bookCategoryBody : BookCategoryBody = {
            categoryId: categoryId,
            bookId: bookId
        }
        const assignBookToCategoryResult : Result = await bookService.assignBookToCategory( bookCategoryBody );
        responseHandler.ok( res, assignBookToCategoryResult.message, assignBookToCategoryResult.data || {} );
    } catch (error : unknown) {
        next( error );
    }
}

const removeBookFromCategory : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const categoryId : number = Number.parseInt( req.params.id );
        if ( !categoryId || categoryId <= 0 ) {
            next( new badRequestError("CategoryId not valid") );
        }
        const bookId : number = Number.parseInt( req.body.id );
        if ( !bookId || bookId <= 0 ) {
            next( new badRequestError("BookId not valid") );
        }
        const bookCategoryBody : BookCategoryBody = {
            categoryId: categoryId,
            bookId: bookId
        }
        const removeBookFromCategoryResult : Result = await bookService.removeBookFromCategory( bookCategoryBody );
        responseHandler.ok( res, removeBookFromCategoryResult.message, removeBookFromCategoryResult.data || {} );
    } catch (error : unknown) {
        next( error );
    }
}

export default {
    getAllBooks,
    getBookByID,
    getBookByName,
    getBookByCategory,
    getBookByAuthor,
    assignBookToCategory,
    removeBookFromCategory,
    addBook,
    updateBook,
    deletedBook
}

