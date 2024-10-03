import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface CustomRequest extends Request {
    user? : string | JwtPayload
}

export interface CustomResponseResult {
    isOk: boolean
    status?: number
    message: string | string[]
    data?: object
}

export interface RegisterBody {
        roleId: number;
        username: string;
        email: string;
        password: string;
        confirmPassword: string
}

export interface LoginBody {
    email: string;
    password: string
}

export interface RoleBody {
    role_name: string
}

export interface UserBody {
    username: string
    email: string
    password: string
    roleId: number
}