import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import { RoleBody } from './../typings/custom.interface.d';
import db from "../configs/database.config.ts";
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { JwtPayload } from 'jsonwebtoken';

const createRole : ( roleBody : RoleBody, _userId : string | JwtPayload ) => Promise<Result>  = async( roleBody : RoleBody, _userId : string | JwtPayload ) => {
    try {
        const userId = typeof _userId === "string" ? _userId : _userId.userId;
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const user : RowDataPacket = isExistUserId[0][0];
        if ( user.roleId != 1 ) {
            throw new forbiddenError("You don't have permission to create role");
        }
        const isExistRoleName : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM roles WHERE role_name = ?', [roleBody.role_name]);
        if ( !isExistRoleName[0] || isExistRoleName[0]?.length > 0 ) {
            throw new conflictError("Role name already exists");
        }
        const createRole : [ ResultSetHeader, FieldPacket[]]= await db.query('INSERT INTO roles( role_name ) VALUES ( ? )', [roleBody.role_name]);
        if ( !createRole[0] || createRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("Role not created");
        }
        return new Result( true, 200, "Role created", createRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const getUserByRoleId : ( roleId: number, _userId : string | JwtPayload ) => Promise<Result> = async( roleId : number, _userId : string | JwtPayload ) => {
    try {
        const userId = typeof _userId === "string" ? _userId : _userId.userId;
        const isExistUserId : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if ( !isExistUserId[0] || isExistUserId[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const user : RowDataPacket = isExistUserId[0][0];
        if ( user.roleId != 1 ) {
            throw new forbiddenError("You don't have permission to get role");
        }
        const isExistRoleId : [ RowDataPacket[], FieldPacket[]]= await db.query('SELECT * FROM roles WHERE roleId = ?', [roleId]);
        if ( !isExistRoleId[0] || isExistRoleId[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const role : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT username, email, u.roleId, role_name FROM users as u INNER JOIN roles as r ON u.roleId = r.roleId WHERE r.roleId = ?', [roleId]);
        if ( !role[0] || role[0]?.length == 0 ) {
            throw new notFoundError("User has this role is not found");
        }
        return new Result( true, 200, "Get role success", role[0] );
    } catch (error : unknown ) {
        throw error
    }
}


export default {
    createRole,
    getUserByRoleId
}