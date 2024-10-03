import { CustomRequest } from './../typings/custom.interface.d';
import { JwtPayload } from 'jsonwebtoken';
import { badRequestError, unauthorizedError } from "../errors/customError.ts";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtToken.util.ts";
export const authenticate : (
    req : CustomRequest,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : CustomRequest, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const header : string = req.headers.authorization || "";
        if ( !header || !header.startsWith('Bearer ') ) {
            next( new unauthorizedError("you must authenticate before") );
        }
        const token : string = header.split(' ')[1];
        const decoded : string | JwtPayload = verifyToken( token );

        req.user = decoded;
        next();
    } catch (error : unknown ) {
        next( new badRequestError(`${error}`) );
    }
}