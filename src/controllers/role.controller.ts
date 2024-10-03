import roleService from "../services/role.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { CustomRequest, RoleBody } from "../typings/custom.interface.ts";
import { badRequestError, notFoundError, conflictError, forbiddenError } from "../errors/customError.ts";
import { Result } from "../utils/result.util"
import { JwtPayload } from "jsonwebtoken";

const createRole : ( 
    req : CustomRequest, 
    res : Response, 
    next : NextFunction  
) => Promise<void> = async( 
    req : CustomRequest, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const roleBody : RoleBody = {
            role_name: req.body.role_name,
        }
        const userId : string | JwtPayload = req.user || "";
        const createRoleResult : Result = await roleService.createRole( roleBody, userId );
        if ( createRoleResult.isOk == false ) {
            if ( createRoleResult.status == 400 ) {
                next( new badRequestError( createRoleResult.message ) );
            }
            if ( createRoleResult.status == 403 ) {
                next( new forbiddenError( createRoleResult.message ) );
            }
            if ( createRoleResult.status == 404 ) {
                next( new notFoundError( createRoleResult.message ) );
            }
            if ( createRoleResult.status == 409 ) {
                next( new conflictError( createRoleResult.message ) );
            }
        } else {
            responseHandler.created( res, createRoleResult.message, createRoleResult.data || {} );
        }
    } catch (error : unknown ) {
        next( new Error(`${ error }`));
    }
}

const getUserByRoleId : ( 
    req : CustomRequest, 
    res : Response, 
    next : NextFunction  
) => Promise<void> = async( 
    req : CustomRequest, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const roleId : number = Number.parseInt( req.params.id );
        const userId : string | JwtPayload = req.user || "";
        if ( !roleId || roleId <= 0 ) {
            next( new badRequestError("RoleId not valid") );
        }
        const getUserByRoleIdResult : Result = await roleService.getUserByRoleId( roleId, userId );
        if ( getUserByRoleIdResult.isOk == false ) {
            if ( getUserByRoleIdResult.status == 403 ) {
                next( new forbiddenError( getUserByRoleIdResult.message ) );
            }
            if ( getUserByRoleIdResult.status == 404 ) {
                next( new notFoundError( getUserByRoleIdResult.message ) );
            }
        } else {
            responseHandler.ok( res, getUserByRoleIdResult.message, getUserByRoleIdResult.data || {} );
        }
    } catch (error : unknown ) {
        next( new Error(`${ error }`));
    }
}


export default {
    createRole,
    getUserByRoleId
}