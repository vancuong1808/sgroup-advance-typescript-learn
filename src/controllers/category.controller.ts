import { CategoryBody } from './../typings/custom.interface.d';
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
        next( error );
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
        next( error );
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
        next( error );
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
        next( error );
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
        next( error );
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
        next( error );
    }
}

export default {
    getAllCategories,
    getCategoryByID,
    getCategoryByName,
    addCategory,
    updateCategory,
    deleteCategory
}