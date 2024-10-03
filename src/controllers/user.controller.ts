import userService from "../services/user.service.ts"
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { badRequestError, forbiddenError ,notFoundError } from "../errors/customError.ts";
import { Result } from "../utils/result.util"
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
        if ( getAllUsersResult.isOk == false ) {
            if ( getAllUsersResult.status == 404 ) {
                next( new notFoundError( getAllUsersResult.message ) );
            }
        } else {
            responseHandler.ok( res, getAllUsersResult.message, getAllUsersResult.data || {} );
        }
    } catch( error : unknown ) {
        next( new Error(`${ error }`));
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
        if ( userResult.isOk == false ) {
            if ( userResult.status == 404 ) {
                next( new notFoundError( userResult.message ) );
            }
        } else {
            responseHandler.ok( res, userResult.message, userResult.data || {} );
        }
    } catch (error : unknown) {
        next( new Error(`${ error }`));
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
            password: req.body.password,
            roleId : req.body.roleId
        }
        const updateUserResult : Result = await userService.updateUser( userId, userBody );
        if ( updateUserResult.isOk == false ) {
            if ( updateUserResult.status == 400 ) {
                next( new badRequestError( updateUserResult.message ) );
            }
            if ( updateUserResult.status == 403 ) {
                next( new forbiddenError( updateUserResult.message ) );
            }
            if ( updateUserResult.status == 404 ) {
                next( new notFoundError( updateUserResult.message ) );
            }
        } else {
            responseHandler.ok( res, updateUserResult.message, updateUserResult.data || {} );
        }
    } catch (error : unknown ) {
        next( new Error(`${ error }`));
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
        if ( deletedUserResult.isOk == false ) {
            if ( deletedUserResult.status == 400 ) {
                next( new badRequestError( deletedUserResult.message ) );
            }
            if ( deletedUserResult.status == 403 ) {
                next( new forbiddenError( deletedUserResult.message ) );
            }
            if ( deletedUserResult.status == 404 ) {
                next( new notFoundError( deletedUserResult.message ) );
            }
        } else {
            responseHandler.ok( res, deletedUserResult.message, deletedUserResult.data || {} );
        }
    } catch (error : unknown ) {
        next( new Error(`${ error }`));
    }
}

export default {
    getAllUsers,
    getUserByID,
    updateUser,
    deletedUser
}