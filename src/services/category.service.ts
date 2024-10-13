import db from '../configs/database.config.ts';
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import { BookCategoryBody, CategoryBody } from '../typings/custom.interface';

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

const assignBookToCategory : ( bookCategoryBody : BookCategoryBody ) => Promise<Result> = async( bookCategoryBody : BookCategoryBody ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId FROM categories WHERE categoryName = ?", [bookCategoryBody.categoryId] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length > 0 ) {
            throw new conflictError("Category already exist");
        }
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId FROM books WHERE bookId = ?", [bookCategoryBody.bookId] );
        if ( !isExistBook[0] || isExistBook[0]?.length == 0 ) {
            throw new notFoundError("Book not found");
        }
        const isExistBookCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, categoryId FROM book_categories WHERE bookId = ? AND categoryId = ?", [bookCategoryBody.bookId, bookCategoryBody.categoryId] );
        if ( !isExistBookCategory[0] || isExistBookCategory[0]?.length > 0 ) {
            throw new conflictError("Book category already exist");
        }
        const assignBookToCategoryResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("INSERT INTO book_categories( bookId, categoryId ) VALUES ( ?, ? )", [bookCategoryBody.bookId, bookCategoryBody.categoryId] );
        if ( !assignBookToCategoryResult[0] || assignBookToCategoryResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Assign book to category failed");
        }
        return new Result( true, 201, "Assign book to category success", assignBookToCategoryResult[0] );
    } catch ( error : unknown ) {
        throw error
    }
}

const removeBookFromCategory : ( bookCategoryBody : BookCategoryBody ) => Promise<Result> = async( bookCategoryBody : BookCategoryBody ) => {
    try {
        const isExistCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT categoryId FROM categories WHERE categoryName = ?", [bookCategoryBody.categoryId] );
        if ( !isExistCategory[0] || isExistCategory[0]?.length == 0 ) {
            throw new notFoundError("Category not found");
        }
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId FROM books WHERE bookId = ?", [bookCategoryBody.bookId] );
        if ( !isExistBook[0] || isExistBook[0]?.length == 0 ) {
            throw new notFoundError("Book not found");
        }
        const isExistBookCategory : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, categoryId FROM book_categories WHERE bookId = ? AND categoryId = ?", [bookCategoryBody.bookId, bookCategoryBody.categoryId] );
        if ( !isExistBookCategory[0] || isExistBookCategory[0]?.length == 0 ) {
            throw new notFoundError("Book category not found");
        }
        const removeBookFromCategoryResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("DELETE FROM book_categories WHERE bookId = ? AND categoryId = ?", [bookCategoryBody.bookId, bookCategoryBody.categoryId] );
        if ( !removeBookFromCategoryResult[0] || removeBookFromCategoryResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Remove book from category failed");
        }
        return new Result( true, 200, "Remove book from category success", removeBookFromCategoryResult[0] );
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
    assignBookToCategory,
    removeBookFromCategory,
    addCategory,
    updateCategory,
    deleteCategory
}