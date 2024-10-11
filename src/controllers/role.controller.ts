import roleService from "../services/role.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { CustomRequest, RoleBody } from "../typings/custom.interface.ts";
import { badRequestError, notFoundError, conflictError, forbiddenError } from "../errors/customError.ts";
import { Result } from '../base/result.base.ts';
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
        responseHandler.created( res, createRoleResult.message, createRoleResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
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
        responseHandler.ok( res, getUserByRoleIdResult.message, getUserByRoleIdResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}


export default {
    createRole,
    getUserByRoleId
}