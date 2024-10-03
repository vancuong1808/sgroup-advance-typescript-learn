import { UserBody } from './../typings/custom.interface.d';
import db from '../configs/database.config.ts';
import { Result } from '../utils/result.util.ts';
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';

const getAllUsers : () => Promise<Result> = async() => {
    try {
        const users : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, username, email, u.roleId, role_name FROM users as u INNER JOIN roles as r ON u.roleId = r.roleId");
        if ( !users[0] || users[0]?.length == 0 ) {
            return new Result( false, 404, "Users not found");
        }
        return new Result( true, 200, "Get all users success", users[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const getUserByID : ( userId: number ) => Promise<Result> = async( userId ) => {
    try {
        const user : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT username, email, u.roleId, role_name FROM users as u INNER JOIN roles as r ON u.roleId = r.roleId  WHERE userId = ?", [userId] );
        if ( !user[0] || user[0]?.length == 0 ) {
            return new Result( false, 404, "User not found");
        }
        return new Result( true, 200, "Get user success", user[0] );
    } catch (error : unknown ) {
        throw error;
    }
}


const updateUser : ( userId : number, userBody : UserBody ) => Promise<Result> = async( userId, userBody ) => {
    try {
        const isExistRoleId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM roles WHERE roleId = ?", [userBody.roleId] );
        if ( !isExistRoleId[0] || isExistRoleId[0]?.length == 0 ) {
            return new Result( false, 404, "RoleId not found");
        }
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE userId", [userId] );
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            return new Result( false, 404, "UserId not found");
        }
        const user : RowDataPacket = isExistUserId[0][0];
        if ( user.roleId != 1 ) {
            return new Result( false, 403, "You don't have permission to update user");
        }
        const updatedUser : [ ResultSetHeader, FieldPacket[]] = await db.query("UPDATE users SET username = ?, email = ?, password = ?, roleId = ? WHERE userId = ?",
                                            [ userBody.username, userBody.email, userBody.password, userBody.roleId, userId ] );
        if ( !updatedUser[0] || updatedUser[0]?.affectedRows == 0 ) {
            return new Result( false, 400, "User not updated");
        }
        return new Result( true, 200, "Update user success", { Result : updatedUser[0] } );
    } catch (error : unknown ) {
        throw error;
    }
}

const deleteUser : ( userId: number ) => Promise<Result> = async( userId ) => {
    try {
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE userId", [userId] );
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            return new Result( false, 404, "UserId not found");
        }
        const user : RowDataPacket = isExistUserId[0][0];
        if ( user.roleId != 1 ) {
            return new Result( false, 403, "You don't have permission to delete user");
        }
        const deletedUser : [ ResultSetHeader, FieldPacket[]] = await db.query("DELETE FROM users WHERE userId = ?", [userId] );
        if ( !deletedUser || deletedUser[0]?.affectedRows == 0 ) {
            return new Result( false, 400, "User not deleted");
        }
        return new Result( true, 200, "Delete user success",  { Result : deletedUser[0] } );
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