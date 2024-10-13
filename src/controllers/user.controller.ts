import userService from "../services/user.service.ts"
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../errors/customError.ts";
import { Result } from '../base/result.base.ts';
import { UserBody } from "../typings/custom.interface.ts";

const getAllUsers : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void>  = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const getAllUsersResult : Result = await userService.getAllUsers();
        responseHandler.ok( res, getAllUsersResult.message, getAllUsersResult.data || {} );
    } catch( error : unknown ) {
        next( new Error() );
    }
}

const getUserByID : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void>  = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const userId : number = Number.parseInt( req.params.id );
        if ( !userId || userId <= 0 ) {
            next( new badRequestError("UserId not valid") );
        }
        const userResult : Result = await userService.getUserByID( userId );
        responseHandler.ok( res, userResult.message, userResult.data || {} );
    } catch (error : unknown) {
        next( new Error() );
    }
}

const updateUser : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void>  = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const userId : number = Number.parseInt( req.params.id );
        if ( !userId || userId <= 0 ) {
            next( new badRequestError("UserId not valid") );
        }
        const userBody : UserBody = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const updateUserResult : Result = await userService.updateUser( userId, userBody );
        responseHandler.ok( res, updateUserResult.message, updateUserResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const deletedUser : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void>  = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const userId : number = Number.parseInt( req.params.id );
        if ( !userId || userId <= 0 ) {
            next( new badRequestError("UserId not valid") );
        }
        const deletedUserResult : Result = await userService.deleteUser( userId );
        responseHandler.ok( res, deletedUserResult.message, deletedUserResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

export default {
    getAllUsers,
    getUserByID,
    updateUser,
    deletedUser
}