import authService from "../services/auth.service.ts"
import responseHandler from "../handlers/response.handler.ts";
import { badRequestError, notFoundError, conflictError, unauthorizedError } from "../errors/customError.ts";
import { NextFunction, Request, Response } from "express";
import { LoginBody, RegisterBody } from "../typings/custom.interface.ts";
import { Result } from "../utils/result.util"


const register : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void>  = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const registerBody : RegisterBody = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            roleId: Number.parseInt( req.body.roleId )
        }
        if ( registerBody.password !== registerBody.confirmPassword ) {
            next( new badRequestError("Confirm password not match with password") );
        }
        const registerResult : Result = await authService.register( registerBody );
        if ( registerResult.isOk == false ) {
            if ( registerResult.status == 400 ) {
                next( new badRequestError( registerResult.message ) );
            }
            if ( registerResult.status == 404 ) {
                next( new notFoundError( registerResult.message ) );
            }
            if ( registerResult.status == 409 ) {
                next( new conflictError( registerResult.message ) );
            }
        } else {
            responseHandler.created( res, registerResult.message, registerResult.data || {} );
        }
    } catch (error : unknown ) {
        next( new Error(`${ error }`));
    }
}

const login : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void> = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const loginBody : LoginBody = {
            email: req.body.email,
            password: req.body.password
        }
        const loginResult : Result = await authService.login( loginBody );
        if ( loginResult.isOk == false ) {
            if ( loginResult.status == 401 ) {
                next( new unauthorizedError( loginResult.message ) );
            }
            if ( loginResult.status == 404 ) {
                next( new notFoundError( loginResult.message ) );
            }
        } else {
            responseHandler.ok( res, loginResult.message, loginResult.data || {} );
        }
    } catch (error : unknown ) {
        next( new Error(`${ error }`));
    }
}

export default {
    register,
    login
}