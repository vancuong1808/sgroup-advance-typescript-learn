import roleService from "../services/role.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { RoleBody, UserRoleBody } from "../typings/custom.interface.ts";
import { Result } from '../base/result.base.ts';
import { badRequestError } from "../errors/customError.ts";


const addRole : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void> = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const roleBody : RoleBody = {
            roleName: req.body.roleName,
        }
        const addRoleResult : Result = await roleService.addRole( roleBody );
        responseHandler.created( res, addRoleResult.message, addRoleResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const getUsersByRoleId : ( 
    req : Request, 
    res : Response, 
    next : NextFunction  
) => Promise<void> = async( 
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const roleId : number = Number.parseInt( req.params.id );
        if ( !roleId || roleId <= 0 ) {
            throw new badRequestError("Invalid roleId");
        }
        const getUserByRoleIdResult : Result = await roleService.getUsersByRoleId( roleId );
        responseHandler.ok( res, getUserByRoleIdResult.message, getUserByRoleIdResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const getPermissionsByRoleId : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const roleId : number = Number.parseInt( req.params.id );
        if ( !roleId || roleId <= 0 ) {
            throw new badRequestError("Invalid roleId");
        }
        const getPermissionsByRoleIdResult : Result = await roleService.getPermissionsByRoleId( roleId );
        responseHandler.ok( res, getPermissionsByRoleIdResult.message, getPermissionsByRoleIdResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const getAllRoles : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const getAllRolesResult : Result = await roleService.getAllRoles();
        responseHandler.ok( res, getAllRolesResult.message, getAllRolesResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const updateRole : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const roleId : number = Number.parseInt( req.params.id );
        if ( !roleId || roleId <= 0 ) {
            throw new badRequestError("Invalid roleId");
        }
        const roleBody : RoleBody = {
            roleName: req.body.roleName,
        }
        const updateRoleResult : Result = await roleService.updateRole( roleId, roleBody );
        responseHandler.ok( res, updateRoleResult.message, updateRoleResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const deleteRole : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const roleId : number = Number.parseInt( req.params.id );
        if ( !roleId || roleId <= 0 ) {
            throw new badRequestError("Invalid roleId");
        }
        const deleteRoleResult : Result = await roleService.deleteRole( roleId );
        responseHandler.ok( res, deleteRoleResult.message, deleteRoleResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const assignRolesToUser : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const userId : number = Number.parseInt( req.body.userId );
        if ( !userId || userId <= 0 ) {
            throw new badRequestError("Invalid userId");
        }
        const roleId : number = Number.parseInt( req.body.id );
        if ( !roleId || roleId <= 0 ) {
            throw new badRequestError("Invalid roleId");
        }
        const userRoleBody : UserRoleBody = {
            userId: userId,
            roleId: roleId
        }
        const assignRolesToUserResult : Result = await roleService.assignRolesToUser( userRoleBody );
        responseHandler.ok( res, assignRolesToUserResult.message, assignRolesToUserResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const removeRolesFromUser : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const userId : number = Number.parseInt( req.params.id );
        if ( !userId || userId <= 0 ) {
            throw new badRequestError("Invalid userId");
        }
        const roleId : number = Number.parseInt( req.body.roleId );
        if ( !roleId || roleId <= 0 ) {
            throw new badRequestError("Invalid roleId");
        }
        const userRoleBody : UserRoleBody = {
            userId: userId,
            roleId: roleId
        }
        const removeRolesFromUserResult : Result = await roleService.removeRolesFromUser( userRoleBody );
        responseHandler.ok( res, removeRolesFromUserResult.message, removeRolesFromUserResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}


export default {
    addRole,
    getUsersByRoleId,
    getPermissionsByRoleId,
    getAllRoles,
    updateRole,
    deleteRole,
    assignRolesToUser,
    removeRolesFromUser
}