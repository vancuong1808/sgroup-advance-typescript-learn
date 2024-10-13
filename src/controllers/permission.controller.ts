import permissionService from "../services/permission.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { badRequestError } from "../errors/customError.ts";
import { NextFunction, Request, Response } from "express";
import { PermissionBody, RolePermissionBody } from "../typings/custom.interface.ts";
import { Result } from '../base/result.base.ts';

const assignPermissionsToRole : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const roleId : number = Number.parseInt( req.body.roleId );
        if ( !roleId || roleId <= 0 ) {
            next( new badRequestError("RoleId not valid") );
        }
        const PermissionId : number = Number.parseInt( req.body.permissionId );
        if ( !PermissionId || PermissionId <= 0 ) {
            next( new badRequestError("PermissionId not valid") );
        }
        const rolePermissionBody : RolePermissionBody = {
            roleId: Number.parseInt( req.body.roleId ),
            permissionId: Number.parseInt( req.body.permissionId )
        }
        const assignPermissionsToRoleResult : Result = await permissionService.assignPermissionsToRole( rolePermissionBody );
        responseHandler.created( res, assignPermissionsToRoleResult.message, assignPermissionsToRoleResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const removePermissionsFromRole : (
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
            next( new badRequestError("RoleId not valid") );
        }
        const PermissionId : number = Number.parseInt( req.body.permissionId );
        if ( !PermissionId || PermissionId <= 0 ) {
            next( new badRequestError("PermissionId not valid") );
        }
        const rolePermissionBody : RolePermissionBody = {
            roleId: Number.parseInt( req.body.roleId ),
            permissionId: Number.parseInt( req.body.permissionId )
        }
        const removePermissionsFromRoleResult : Result = await permissionService.removePermissionsFromRole( rolePermissionBody );
        responseHandler.ok( res, removePermissionsFromRoleResult.message, removePermissionsFromRoleResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const getAllPermissions : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const getAllPermissionsResult : Result = await permissionService.getAllPermissions();
        responseHandler.ok( res, getAllPermissionsResult.message, getAllPermissionsResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const getPermissionById : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const permissionId : number = Number.parseInt( req.params.id );
        if ( !permissionId || permissionId <= 0 ) {
            next( new badRequestError("PermissionId not valid") );
        }
        const getPermissionByIdResult : Result = await permissionService.getPermissionById( permissionId );
        responseHandler.ok( res, getPermissionByIdResult.message, getPermissionByIdResult.data || {} );
    }
    catch (error : unknown ) {
        next( new Error() );
    }
}

const addPermission : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const permissionBody : PermissionBody = {
            permissionName: req.body.permissionName
        }
        const addPermissionResult : Result = await permissionService.addPermission( permissionBody );
        responseHandler.created( res, addPermissionResult.message, addPermissionResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const updatePermission : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const permissionId : number = Number.parseInt( req.params.id );
        if ( !permissionId || permissionId <= 0 ) {
            next( new badRequestError("PermissionId not valid") );
        }
        const permissionBody : PermissionBody = {
            permissionName: req.body.permissionName
        }
        const updatePermissionResult : Result = await permissionService.updatePermission( permissionId, permissionBody );
        responseHandler.ok( res, updatePermissionResult.message, updatePermissionResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

const deletePermission : (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        const permissionId : string = req.params.id;
        if ( !permissionId || permissionId === "" ) {
            next( new badRequestError("PermissionId not valid") );
        }
        const deletePermissionResult : Result = await permissionService.deletePermission( permissionId );
        responseHandler.ok( res, deletePermissionResult.message, deletePermissionResult.data || {} );
    } catch (error : unknown ) {
        next( new Error() );
    }
}

export default {
    assignPermissionsToRole,
    removePermissionsFromRole,
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission,
    deletePermission
}

