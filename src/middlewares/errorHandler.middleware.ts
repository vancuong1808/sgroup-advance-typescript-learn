import responseHandler from "../handlers/response.handler.ts";
import { Response, Request, NextFunction } from "express";
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";

export const errorHandler : ( 
    err : unknown,
    req : Request,
    res : Response,
    next : NextFunction
) => Response<unknown, Record<any, string>>
 = ( err : unknown, req : Request, res : Response, next : NextFunction ) => {

    if ( err instanceof badRequestError ) {
        return responseHandler.badRequest( res, err.message );
    }

    if ( err instanceof conflictError ) {
        return responseHandler.conflict( res, err.message );
    }

    if ( err instanceof forbiddenError ) {
        return responseHandler.forbidden( res, err.message );
    }

    if ( err instanceof notFoundError ) {
        return responseHandler.notFound( res, err.message );
    }

    if ( err instanceof unauthorizedError ) {
        return responseHandler.unauthorized( res, err.message );
    }

    return responseHandler.internalServerError(res, ( err as Error ).message || "INTERNAL_SERVER_ERROR");
}