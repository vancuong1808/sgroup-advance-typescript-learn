import db from '../configs/database.config.ts';
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import { BookBody } from '../typings/custom.interface';

const getAllBooks : () => Promise<Result> = async() => {
    try {
        const isExistBooks : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, title, author FROM books");
        if ( !isExistBooks[0] || isExistBooks[0]?.length == 0 ) {
            throw new notFoundError("Books not found");
        }
        return new Result( true, 200, "Get all books success", isExistBooks[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}


const getBookByID : ( bookId: number ) => Promise<Result> = async( bookId ) => {
    try {
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, title, author FROM books WHERE bookId = ?", [bookId] );
        if ( !isExistBook[0] || isExistBook[0]?.length == 0 ) {
            throw new notFoundError("Book not found");
        }
        return new Result( true, 200, "Get book by id success", isExistBook[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const getBookByName : ( title: string ) => Promise<Result> = async( title ) => {
    try {
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, title, author FROM books WHERE title = ?", [title] );
        if ( !isExistBook[0] || isExistBook[0]?.length == 0 ) {
            throw new notFoundError("Book not found");
        }
        return new Result( true, 200, "Get book by name success", isExistBook[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const addBook : ( bookBody : BookBody ) => Promise<Result> = async( bookBody: BookBody ) => {
    try {
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, title, author FROM books WHERE title = ?", [bookBody.title] );
        if ( !isExistBook[0] || isExistBook[0]?.length > 0 ) {
            throw new conflictError("Book already exist");
        }
        const addBookResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("INSERT INTO books( title, author ) VALUES ( ?, ? )", [bookBody.title, bookBody.author] );
        if ( !addBookResult[0] || addBookResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Add book failed");
        }
        return new Result( true, 201, "Add book success", addBookResult[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

const updateBook : ( bookId : number, bookBody : BookBody ) => Promise<Result> = async( bookId, bookBody ) => {
    try {
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, title, author FROM books WHERE bookId = ?", [bookId] );
        if ( !isExistBook[0] || isExistBook[0]?.length == 0 ) {
            throw new notFoundError("Book not found");
        }
        const updateBookResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("UPDATE books SET title = ?, author = ? WHERE bookId = ?", [bookBody.title, bookBody.author, bookId] );
        if ( !updateBookResult[0] || updateBookResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Update book failed");
        }
        return new Result( true, 200, "Update book success", updateBookResult[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

const deleteBook : ( bookId : number ) => Promise<Result> = async( bookId ) => {
    try {
        const isExistBook : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT bookId, title, author FROM books WHERE bookId = ?", [bookId] );
        if ( !isExistBook[0] || isExistBook[0]?.length == 0 ) {
            throw new notFoundError("Book not found");
        }
        const deleteBookResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("DELETE FROM books WHERE bookId = ?", [bookId] );
        if ( !deleteBookResult[0] || deleteBookResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Delete book failed");
        }
        return new Result( true, 200, "Delete book success", deleteBookResult[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

export default {
    getAllBooks,
    getBookByID,
    getBookByName,
    addBook,
    updateBook,
    deleteBook
}