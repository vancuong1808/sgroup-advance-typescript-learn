import { UserBody } from './../typings/custom.interface.d';
import db from '../configs/database.config.ts';
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';

const getAllUsers : () => Promise<Result> = async() => {
    try {
        const isExistUsers : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, username, email, u.roleId, role_name FROM users as u INNER JOIN roles as r ON u.roleId = r.roleId");
        if ( !isExistUsers[0] || isExistUsers[0]?.length == 0 ) {
            throw new notFoundError("Users not found");
        }
        const users = isExistUsers[0][0];
        if ( users.roleId != 1 ) {
            throw new forbiddenError("You don't have permission to get all users");
        }
        return new Result( true, 200, "Get all users success", isExistUsers[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const getUserByID : ( userId: number ) => Promise<Result> = async( userId ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT username, email, u.roleId, role_name FROM users as u INNER JOIN roles as r ON u.roleId = r.roleId  WHERE userId = ?", [userId] );
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("User not found");
        }
        const user = isExistUser[0][0];
        if ( user.roleId != 1 ) {
            throw new forbiddenError("You don't have permission to get user");
        }
        return new Result( true, 200, "Get user success", isExistUser[0] );
    } catch (error : unknown ) {
        throw error;
    }
}


const updateUser : ( userId : number, userBody : UserBody ) => Promise<Result> = async( userId, userBody ) => {
    try {
        const isExistRoleId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM roles WHERE roleId = ?", [userBody.roleId] );
        if ( !isExistRoleId[0] || isExistRoleId[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE userId", [userId] );
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const user : RowDataPacket = isExistUserId[0][0];
        if ( user.roleId != 1 ) {
            throw new forbiddenError("You don't have permission to update user");
        }
        const updatedUser : [ ResultSetHeader, FieldPacket[]] = await db.query("UPDATE users SET username = ?, email = ?, password = ?, roleId = ? WHERE userId = ?",
                                            [ userBody.username, userBody.email, userBody.password, userBody.roleId, userId ] );
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
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE userId", [userId] );
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const user : RowDataPacket = isExistUserId[0][0];
        if ( user.roleId != 1 ) {
            throw new forbiddenError("You don't have permission to delete user");
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