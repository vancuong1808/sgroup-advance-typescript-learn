import { CustomError } from "../typings/custom.interface";
abstract class customError extends Error implements CustomError {
    abstract readonly _message: string;
    abstract customMessage: string | string[];
    constructor( message : string | string[] ) {
        if ( typeof message === "string" ) {
            super( message );
            this.message = message;
        } else if ( Array.isArray( message ) ) {
            super();
        }
    }
}

export class badRequestError extends customError {
    _message: string = "BadRequest";
    customMessage!: string | string[];
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.customMessage = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.customMessage = message;
        }
    }
}

export class unauthorizedError extends customError {
    _message: string = "Unauthorized";
    customMessage!: string | string[];
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.customMessage = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.customMessage = message;
        }
    }
}

export class forbiddenError extends customError {    
    _message: string = "Forbidden";
    customMessage!: string | string[];
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.customMessage = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.customMessage = message;
        }
    }
}

export class notFoundError extends customError {
    _message: string = "Not Found";
    customMessage!: string | string[];
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.customMessage = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.customMessage = message;
        }
    }
}

export class conflictError extends customError {    
    _message: string = "Conflict";
    customMessage!: string | string[];
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.customMessage = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.customMessage = message;
        }
    }
}


