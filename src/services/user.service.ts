import { UserBody } from './../typings/custom.interface.d';
import db from '../configs/database.config.ts';
import { Result } from '../base/result.base.ts';
import { badRequestError, notFoundError } from "../errors/customError.ts";
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

const getAllUsers : () => Promise<Result> = async() => {
    try {
        const isExistUsers : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, username, email FROM users");
        if ( !isExistUsers[0] || isExistUsers[0]?.length == 0 ) {
            throw new notFoundError("Users not found");
        }
        return new Result( true, 200, "Get all users success", isExistUsers[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const getUserByID : ( userId: number ) => Promise<Result> = async( userId ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, username, email FROM users WHERE userId = ?", [userId] );
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("User not found");
        }
        return new Result( true, 200, "Get user success", isExistUser[0] );
    } catch (error : unknown ) {
        throw error;
    }
}


const updateUser : ( userId : number, userBody : UserBody ) => Promise<Result> = async( userId, userBody ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE userId = ?", [userId] );
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const updatedUser : [ ResultSetHeader, FieldPacket[]] = await db.query("UPDATE users SET username = ?, email = ?, password = ? WHERE userId = ?",
                                            [ userBody.username, userBody.email, userBody.password, userId ] );
        if ( !updatedUser[0] || updatedUser[0]?.affectedRows == 0 ) {
            throw new badRequestError("User not updated");
        }
        return new Result( true, 200, "Update user success", updatedUser[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const deleteUser : ( userId: number ) => Promise<Result> = async( userId ) => {
    try {
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, username, email FROM users WHERE userId", [userId] );
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const deletedUser : [ ResultSetHeader, FieldPacket[]] = await db.query("DELETE FROM users WHERE userId = ?", [userId] );
        if ( !deletedUser || deletedUser[0]?.affectedRows == 0 ) {
            throw new badRequestError("User not deleted");
        }
        return new Result( true, 200, "Delete user success",  deletedUser[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

export default {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
}