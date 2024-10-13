import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import db from "../configs/database.config.ts";
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { genToken } from "../utils/jwtToken.util.ts";
import { hashPassword, comparePassword } from "../utils/auth.util.ts";
import { LoginBody, RegisterBody } from "../typings/custom.interface";

const register : ( registerBody : RegisterBody ) => Promise<Result> = async( registerBody : RegisterBody ) => {
    try {
        const isExistUsername : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE username = ?", [registerBody.username] );
        if ( !isExistUsername[0] || isExistUsername[0]?.length > 0 ) {
            throw new conflictError("User with username already exists");
        }
        const isExistEmail : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users WHERE email = ?", [registerBody.email] );
        if ( !isExistEmail[0] || isExistEmail[0]?.length > 0 ) {
            throw new conflictError("User with email already exists");
        }
        const hashPasswordResult : string = await hashPassword( registerBody.password );
        const registerResult : [ ResultSetHeader, FieldPacket[] ] = await db.query("INSERT INTO users( username, email, password ) VALUES ( ?, ?, ? )", 
                                        [registerBody.username, registerBody.email, hashPasswordResult] );
        if ( !registerResult[0] || registerResult[0]?.affectedRows == 0 ) {
            throw new badRequestError("Register fail");
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
            throw new notFoundError("Email not found");
        }
        const user = isExistEmail[0][0];
        const comparePasswordResult : boolean = await comparePassword( loginBody.password, user.password );
        if ( !comparePasswordResult ) {
            throw new unauthorizedError("Password wrong");
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

