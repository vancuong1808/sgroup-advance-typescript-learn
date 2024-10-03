abstract class customError extends Error {
    abstract readonly _message: string;
    constructor( message : string | string[] ) {
        
        if ( typeof message === "string" ) {
            super( message );
            this.message = message || "ERROR";
        } else if ( Array.isArray( message ) ) {
            super( "ERROR" );
            this.message = message.join('\n ');
        }
        
    }
}

export class badRequestError extends customError {
    _message: string = "BadRequest";
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.message = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.message = message.join('\n ');
        }
        
    }
}

export class unauthorizedError extends customError {
    _message: string = "Unauthorized";
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.message = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.message = message.join('\n ');
        }
    }
}

export class forbiddenError extends customError {    
    _message: string = "Forbidden";
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.message = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.message = message.join('\n ');
        }
    }
}

export class notFoundError extends customError {
    _message: string = "Not Found";
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.message = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.message = message.join('\n ');
        }
    }
}

export class conflictError extends customError {    
    _message: string = "Conflict";
    constructor( message : string | string[] ) {
        super( message );
        if ( typeof message === "string" ) {
            this.message = message || this._message;
        } else if ( Array.isArray( message ) ) {
            this.message = message.join('\n ');
        }
    }
}


