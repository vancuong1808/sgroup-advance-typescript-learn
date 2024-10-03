import jwt, { JwtPayload } from "jsonwebtoken"
import { envServer } from "../env";

export const genToken : (
    data : string | object
) => string = ( data ) => {
    const token : string = jwt.sign({ userId : `${ data }` }, envServer.SECRET_KEY );
    return token;
}

export const verifyToken : (
    token : string
) => string | JwtPayload = ( token ) => {
    try {
        const decoded : string | JwtPayload = jwt.verify( token, envServer.SECRET_KEY );
        return decoded;
    } catch (error : unknown) {
        throw error;
    }
}