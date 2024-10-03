import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import db from "../configs/database.config.ts";
import { Result } from "../utils/result.util.ts";
import { genToken } from "../utils/jwtToken.util.ts";
import { hashPassword, comparePassword } from "../utils/auth.util.ts";
import { LoginBody, RegisterBody } from "../typings/custom.interface";

const register : ( registerBody : RegisterBody ) => Promise<Result> = async( registerBody : RegisterBody ) => {
    try {
        const isExistRoleId : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM roles WHERE roleId = ?", [registerBody.roleId] );
        if ( !isExistRoleId[0] || isExistRoleId[0]?.length === 0 ) {
            return new Result( false, 404, "RoleId not found");
        }
        const isExistUsername : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE username = ?", [registerBody.username] );
        if ( !isExistUsername[0] || isExistUsername[0]?.length > 0 ) {
            return new Result( false, 409, "User with username already exists");
        }
        const isExistEmail : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE email = ?", [registerBody.email] );
        if ( !isExistEmail[0] || isExistEmail[0]?.length > 0 ) {
            return new Result( false, 409, "User with email already exists");
        }
        const hashPasswordResult : string = await hashPassword( registerBody.password );
        const registerResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("INSERT INTO users( username, email, password, roleId ) VALUES ( ?, ?, ?, ? )", 
                                        [registerBody.username, registerBody.email, hashPasswordResult, registerBody.roleId] );
        if ( !registerResult[0] || registerResult[0]?.affectedRows == 0 ) {
            return new Result( false, 400, "Register fail");
        }                                
        return new Result( true, 200, "Register success", registerResult[0] );
    } catch (error : unknown ) {
        throw error;
    }
}

const login : ( loginBody : LoginBody ) => Promise<Result> = async( loginBody : LoginBody ) => {
    try {
        const isExistEmail : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE email = ?", [loginBody.email]);
        if ( !isExistEmail[0] || isExistEmail[0]?.length == 0 ) {
            return new Result( false, 404, "Email not found");
        }
        const user = isExistEmail[0][0];
        const comparePasswordResult : boolean = await comparePassword( loginBody.password, user.password );
        if ( !comparePasswordResult ) {
            return new Result( false, 401, "Password wrong");
        }
        const token : string = genToken( user.userId );
        return new Result( true, 200, "Login success", token );
    } catch (error : unknown ) {
        throw error;
    }
}


export default {
    register,
    login
}
