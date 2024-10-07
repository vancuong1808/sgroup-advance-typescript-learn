import { httpStatusCode } from '../constants/httpStatusCode.ts';
import { Response } from 'express';
const customResponse : (
    res : Response,
    statusCode : number,
    message : string | string[],
    isOk : boolean,
    data? : object
) => Response<unknown, Record<any, string>> = (
    res : Response,
    statusCode : number,
    message : string | string[],
    isOk : boolean,
    data? : object
) => { return res.status( statusCode ).json({
    isOk,
    statusCode,
    message,
    data
})}

const ok : (
    res : Response,
    message : string | string[],
    data : object
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[],
    data : object
) => customResponse( res, httpStatusCode.OK, message, true, data );

const created : (
    res : Response,
    message : string | string[],
    data : object
) =>  Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[], 
    data : object
) => customResponse( res, httpStatusCode.CREATED, message, true, data );

const badRequest : ( 
    res : Response,
    message : string | string[]
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[]
) => customResponse( res, httpStatusCode.BAD_REQUEST, message, false );

const unauthorized : (
    res : Response,
    message : string | string[]
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[]
) => customResponse( res, httpStatusCode.UNAUTHORIZED, message, false );

const forbidden : (
    res : Response,
    message : string | string[]
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[]
) => customResponse( res, httpStatusCode.FORBIDDEN, message, false );

const notFound : (
    res : Response,
    message : string | string[]
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[]
) => customResponse( res, httpStatusCode.NOT_FOUND, message, false );

const conflict : (
    res : Response,
    message : string | string[]
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[]
) => customResponse( res, httpStatusCode.CONFLICT, message, false );

const internalServerError : (
    res : Response,
    message : string | string[]
) => Response<unknown, Record<any, string>> = (
    res : Response,
    message : string | string[]
) => customResponse( res, httpStatusCode.INTERNAL_SERVER_ERROR, message, false );

export default {
    ok,
    created,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    internalServerError
}

