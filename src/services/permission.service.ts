import db from '../configs/database.config.ts';
import { FieldPacket, RowDataPacket, ResultSetHeader } from 'mysql2';
import { notFoundError, conflictError, badRequestError } from "../errors/customError.ts";
import { JwtPayload } from 'jsonwebtoken';
import { PermissionBody, RolePermissionBody } from '../typings/custom.interface';
import { Result } from '../base/result.base.ts';

const GetPerrmission : ( userId : string | JwtPayload ) => Promise<string[]> = async( userId : string | JwtPayload ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT userId FROM users WHERE userId = ?", [userId] );
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("User not found");
        }
        const isExistUserRole : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT roleId FROM user_roles WHERE userId = ?", [userId]);
        if ( !isExistUserRole[0] || isExistUserRole[0]?.length == 0 ) {
            throw new notFoundError("User's role not found");
        }
        const roles : RowDataPacket[] = isExistUserRole[0];
        const rolesOfUser : Promise<number>[] = roles.map( async( role : RowDataPacket ) => {
            const isExistRole : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT roleId FROM roles WHERE roleId = ?", [ role.roleId] );
            if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
                throw new notFoundError("Role not found");
            }
            return isExistRole[0][0].roleId;
        } )
        const rolesOfUserIds : number[] = await Promise.all( rolesOfUser );
        
        const isExistPermissions : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT permissionId FROM role_permissions WHERE roleId IN (?)", [ rolesOfUserIds ]);
        if ( !isExistPermissions[0] || isExistPermissions[0]?.length == 0 ) {
            throw new notFoundError("Permissions not found");
        }
        const permissions : RowDataPacket[] = isExistPermissions[0];
        const permissionsOfRole : Promise<string>[] = permissions.map( async( permission : RowDataPacket ) => {
            const isExistPermission : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT permissionId, permissionName FROM permissions WHERE permissionId = ?", [ permission.permissionId] );
            if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
                throw new notFoundError("Permission not found");
            }
            return isExistPermission[0][0].permissionName;
        } )

        return Promise.all( permissionsOfRole );
        

    } catch ( error : unknown ) {
        throw error
    }
}

const assignPermissionsToRole : ( rolePermissionBody : RolePermissionBody ) => Promise<Result> = async( rolePermissionBody : RolePermissionBody ) => {
    try {
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT roleId FROM roles WHERE roleId = ?', [rolePermissionBody.roleId]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const isExistPermission : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT permissionId FROM permissions WHERE permissionId = ?', [rolePermissionBody.permissionId]);
        if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
            throw new notFoundError("PermissionId not found");
        }
        const isExistRolePermission : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT roleId, permissionId FROM role_permissions WHERE roleId =? AND permissionId =?", [ rolePermissionBody.roleId, rolePermissionBody.permissionId ]);
        if ( !isExistRolePermission[0] || isExistRolePermission[0]?.length > 0 ) {
            throw new conflictError("User has role already exist");
        }
        const addUserRole : [ ResultSetHeader, FieldPacket[]] = await db.query("INSERT INTO role_permissions( roleId, permissionId ) VALUES ( ?, ? )", [ rolePermissionBody.roleId, rolePermissionBody.permissionId ]);
        if ( !addUserRole[0] || addUserRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("User role not assgin");
        }
        return new Result( true, 200, "Assign permissions to role success", addUserRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const removePermissionsFromRole : ( rolePermissionBody : RolePermissionBody ) => Promise<Result> = async( rolePermissionBody : RolePermissionBody ) => {
    try {
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT roleId FROM roles WHERE roleId = ?', [rolePermissionBody.roleId]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const isExistPermission : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT permissionId FROM permissions WHERE permissionId = ?', [rolePermissionBody.permissionId]);
        if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
            throw new notFoundError("PermissionId not found");
        }
        const isExistRolePermission : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT roleId, permissionId FROM role_permissions WHERE roleId =? AND permissionId =?", [ rolePermissionBody.roleId, rolePermissionBody.permissionId ]);
        if ( !isExistRolePermission[0] || isExistRolePermission[0]?.length == 0 ) {
            throw new notFoundError("User has role not found");
        }
        const removeRolePermission : [ ResultSetHeader, FieldPacket[]] = await db.query("DELETE FROM role_permissions WHERE roleId = ? AND permissionId = ?", [ rolePermissionBody.roleId, rolePermissionBody.permissionId ]);
        if ( !removeRolePermission[0] || removeRolePermission[0]?.affectedRows == 0 ) {
            throw new badRequestError("User role not deleted");
        }
        return new Result( true, 200, "Remove permissions out of role success", removeRolePermission[0] );
    } catch (error : unknown ) {
        throw error
    }

}

const addPermission : ( permissionBody : PermissionBody ) => Promise<Result> = async( permissionBody : PermissionBody ) => {
    try {
        const isExistPermission : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM permissions WHERE permissionName = ?', [permissionBody.permissionName]);
        if ( !isExistPermission[0] || isExistPermission[0]?.length > 0 ) {
            throw new conflictError("Permission already exist");
        }
        const addPermission : [ ResultSetHeader, FieldPacket[]] = await db.query("INSERT INTO permissions( permissionName ) VALUES ( ? )", [ permissionBody.permissionName ]);
        if ( !addPermission[0] || addPermission[0]?.affectedRows == 0 ) {
            throw new badRequestError("Permission not created");
        }
        return new Result( true, 200, "Add permission success", addPermission[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const getAllPermissions : () => Promise<Result> = async() => {
    try {
        const isExistPermissions : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM permissions");
        if ( !isExistPermissions[0] || isExistPermissions[0]?.length == 0 ) {
            throw new notFoundError("Permissions not found");
        }
        return new Result( true, 200, "Get all permissions success", isExistPermissions[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const getPermissionById : ( permissionId : number ) => Promise<Result> = async( permissionId : number ) => {
    try {
        const isExistPermission : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM permissions WHERE permissionId = ?", [permissionId]);
        if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
            throw new notFoundError("Permission not found");
        }
        return new Result( true, 200, "Get permission success", isExistPermission[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const updatePermission : ( permissionId : number, permissionBody : PermissionBody ) => Promise<Result> = async( permissionId : number, permissionBody : PermissionBody ) => {
    try {
        const isExistPermission : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT permissionId FROM permissions WHERE permissionId = ?", [permissionId]);
        if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
            throw new notFoundError("Permission not found");
        }
        const updatePermission : [ ResultSetHeader, FieldPacket[]] = await db.query("UPDATE permissions SET permissionName = ? WHERE permissionId = ?", [permissionBody.permissionName, permissionId]);
        if ( !updatePermission[0] || updatePermission[0]?.affectedRows == 0 ) {
            throw new badRequestError("Permission not updated");
        }
        return new Result( true, 200, "Update permission success", updatePermission[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const deletePermission : ( permissionId : string ) => Promise<Result> = async( permissionId : string ) => {
    try {
        const isExistPermission : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT permissionId FROM permissions WHERE permissionId = ?", [permissionId]);
        if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
            throw new notFoundError("Permission not found");
        }
        const deletePermission : [ ResultSetHeader, FieldPacket[]] = await db.query("DELETE FROM permissions WHERE permissionId = ?", [ permissionId ]);
        if ( !deletePermission[0] || deletePermission[0]?.affectedRows == 0 ) {
            throw new badRequestError("Permission not deleted");
        }
        return new Result( true, 200, "Delete permission success", deletePermission[0] );
    } catch (error : unknown ) {
        throw error
    }
}

export default {
    GetPerrmission,
    assignPermissionsToRole,
    addPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
    removePermissionsFromRole
}