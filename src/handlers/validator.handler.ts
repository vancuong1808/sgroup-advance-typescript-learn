import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";
import { badRequestError } from "../errors/customError.ts";

export const validateHandler : ( 
    req : Request, 
    res : Response, 
    next : NextFunction ) => void 
    = ( req : Request, 
        res : Response, 
        next : NextFunction ) => {
    const errors : Result<ValidationError> = validationResult( req );
    if ( !errors.isEmpty() ) {
        const errorMsg : string[] = errors.array().map( (error) => `${ error.msg }` );
        next( new badRequestError( errorMsg ) );
    }
    next();
}