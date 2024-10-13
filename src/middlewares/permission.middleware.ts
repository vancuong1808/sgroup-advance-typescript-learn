import { Response, Request, NextFunction } from "express";
import permissionService from "../services/permission.service";
import { badRequestError, forbiddenError, unauthorizedError } from "../errors/customError";
import { CustomRequest } from './../typings/custom.interface.d';
import { JwtPayload } from "jsonwebtoken";

export const RequiredPermissions : (
    requiredPermission : string
) => ( req : CustomRequest, res : Response, next : NextFunction ) => Promise<void> = ( 
    requiredPermission : string
) => {
    return async( req : CustomRequest, res : Response, next : NextFunction ) => {
        try {
            if ( !req.user ) {
                throw new unauthorizedError("User is not authenticated");
            }
            const userId : string | JwtPayload = typeof req.user === "string" ? req.user : req.user.userId;
            if ( !userId ) {
                throw new unauthorizedError("User is not authenticated");
            }
            const getPermissionResult : string[] = await permissionService.GetPerrmission( userId );
            const isExistRequiredPermission : boolean = getPermissionResult.includes( requiredPermission );
            if ( !isExistRequiredPermission ) {
                throw new forbiddenError("You don't have permission to access this resource");
            }
            next();
        } catch ( error : unknown ) {
            next( new badRequestError(`${error}`) );
        }
    }
}