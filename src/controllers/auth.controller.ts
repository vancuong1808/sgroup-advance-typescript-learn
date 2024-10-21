import authService from "../services/auth.service.ts"
import responseHandler from "../handlers/response.handler.ts";
import { badRequestError } from "../errors/customError.ts";
import { NextFunction, Request, Response } from "express";
import { LoginBody, RegisterBody } from "../typings/custom.interface.ts";
import { Result } from '../base/result.base.ts';


const register : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void> = async( 
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
        responseHandler.created( res, registerResult.message, registerResult.data || {} );
    } catch (error : unknown ) {
        next( error);
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
        responseHandler.ok( res, loginResult.message, loginResult.data || {} );
    } catch (error : unknown ) {
        next( error);
    }
}

export default {
    register,
    login
}