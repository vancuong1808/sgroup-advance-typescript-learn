import db from '../configs/database.config.ts';
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import { CategoryBody } from '../typings/custom.interface';

const getAllCategories : () => Promise<Result> = async() => {
    try {
        const isExistCategories : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId, categoryName FROM categories");
        if ( !isExistCategories[0] || isExistCategories[0]?.length == 0 ) {
            throw new notFoundError("Categories not found");
        }
        return new Result( true, 200, "Get all categories success", isExistCategories[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

const getCategoryByID : ( categoryId: number ) => Promise<Result> = async( categoryId ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId, categoryName FROM categories WHERE categoryId = ?", [categoryId] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length == 0 ) {
            throw new notFoundError("Category not found");
        }
        return new Result( true, 200, "Get category by id success", isExistCategory[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const getCategoryByName : ( categoryBody : CategoryBody ) => Promise<Result> = async( categoryBody : CategoryBody ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId, categoryName FROM categories WHERE categoryName = ?", [categoryBody.categoryName] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length == 0 ) {
            throw new notFoundError("Category not found");
        }
        return new Result( true, 200, "Get category by name success", isExistCategory[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const addCategory : ( categoryBody : CategoryBody ) => Promise<Result> = async( categoryBody: CategoryBody ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId, categoryName FROM categories WHERE categoryName = ?", [categoryBody.categoryName] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length > 0 ) {
            throw new conflictError("Category already exist");
        }
        const addCategoryResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("INSERT INTO categories( categoryName ) VALUES ( ? )", [categoryBody.categoryName] );
        if ( !addCategoryResult[0] || addCategoryResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Add category failed");
        }
        return new Result( true, 201, "Add category success", addCategoryResult[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

const updateCategory : ( categoryId : number, categoryBody : CategoryBody ) => Promise<Result> = async( categoryId, categoryBody ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId, categoryName FROM categories WHERE categoryId = ?", [categoryId] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length == 0 ) {
            throw new notFoundError("Category not found");
        }
        const updateCategoryResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("UPDATE categories SET categoryName = ? WHERE categoryId = ?", [categoryBody.categoryName, categoryId] );
        if ( !updateCategoryResult[0] || updateCategoryResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Update category failed");
        }
        return new Result( true, 200, "Update category success", updateCategoryResult[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

const deleteCategory : ( categoryId : number ) => Promise<Result> = async( categoryId ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId, categoryName FROM categories WHERE categoryId = ?", [categoryId] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length == 0 ) {
            throw new notFoundError("Category not found");
        }
        const deleteCategoryResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("DELETE FROM categories WHERE categoryId = ?", [categoryId] );
        if ( !deleteCategoryResult[0] || deleteCategoryResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Delete category failed");
        }
        return new Result( true, 200, "Delete category success", deleteCategoryResult[0] );
    } catch ( error : unknown ) {
        throw error;
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