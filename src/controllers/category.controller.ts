import { BookCategoryBody, CategoryBody } from './../typings/custom.interface.d';
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../errors/customError.ts";
import { Result } from '../base/result.base.ts';
import categoryService from "../services/category.service.ts";

const getAllCategories : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const getAllCategoriesResult : Result = await categoryService.getAllCategories();
        responseHandler.ok( res, getAllCategoriesResult.message, getAllCategoriesResult.data || {} );
    } catch( error : unknown ) {
        next( new Error() );
    }
}

const getCategoryByID : (
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
        const getCategoryByIdResult : Result = await categoryService.getCategoryByID( categoryId );
        responseHandler.ok( res, getCategoryByIdResult.message, getCategoryByIdResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
    }
}

const getCategoryByName : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const categoryBody : CategoryBody = {
            categoryName: req.body.categoryName,
        } 
        const getCategoryByNameResult : Result = await categoryService.getCategoryByName( categoryBody );
        responseHandler.ok( res, getCategoryByNameResult.message, getCategoryByNameResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
    }
}

const addCategory : (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> = async( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const categoryBody : CategoryBody = {
            categoryName: req.body.categoryName,
        }
        const addCategoryResult : Result = await categoryService.addCategory( categoryBody );
        responseHandler.created( res, addCategoryResult.message, addCategoryResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
    }
}

const updateCategory : (
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
        const categoryBody : CategoryBody = {
            categoryName: req.body.categoryName,
        }
        const updateCategoryResult : Result = await categoryService.updateCategory( categoryId, categoryBody );
        responseHandler.ok( res, updateCategoryResult.message, updateCategoryResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
    }
}

const deleteCategory : (
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
        const deleteCategoryResult : Result = await categoryService.deleteCategory( categoryId );
        responseHandler.ok( res, deleteCategoryResult.message, deleteCategoryResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
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
        const assignBookToCategoryResult : Result = await categoryService.assignBookToCategory( bookCategoryBody );
        responseHandler.ok( res, assignBookToCategoryResult.message, assignBookToCategoryResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
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
        const removeBookFromCategoryResult : Result = await categoryService.removeBookFromCategory( bookCategoryBody );
        responseHandler.ok( res, removeBookFromCategoryResult.message, removeBookFromCategoryResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
    }
}

export default {
    getAllCategories,
    getCategoryByID,
    getCategoryByName,
    assignBookToCategory,
    removeBookFromCategory,
    addCategory,
    updateCategory,
    deleteCategory
}