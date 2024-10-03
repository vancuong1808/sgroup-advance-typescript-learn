import bcript from 'bcryptjs'

export const hashPassword : (
    password : string
) => Promise<string> = async( password : string ) => {
    const salt : string = await bcript.genSalt( 10 );
    const hashResult : string = await bcript.hash( password, salt );
    return hashResult;
}

export const comparePassword : (
    password1 : string,
    password2 : string
) => Promise<boolean> = async( password1 : string , password2 : string ) => {
    const comparedResult : boolean = await bcript.compare( password1, password2 );
    return comparedResult;
}