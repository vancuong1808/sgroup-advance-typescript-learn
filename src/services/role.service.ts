import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import { RoleBody, UserRoleBody } from './../typings/custom.interface.d';
import db from "../configs/database.config.ts";
import { Result } from '../base/result.base.ts';
import { badRequestError, conflictError, forbiddenError, unauthorizedError, notFoundError } from "../errors/customError.ts";
import { JwtPayload } from 'jsonwebtoken';

const addRole : ( roleBody : RoleBody ) => Promise<Result>  = async( roleBody : RoleBody ) => {
    try {
        const isExistRoleName : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM roles WHERE roleName = ?', [roleBody.roleName]);
        if ( !isExistRoleName[0] || isExistRoleName[0]?.length > 0 ) {
            throw new conflictError("Role name already exists");
        }
        const addRole : [ ResultSetHeader, FieldPacket[]]= await db.query('INSERT INTO roles( roleName ) VALUES ( ? )', [roleBody.roleName]);
        if ( !addRole[0] || addRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("Role not created");
        }
        return new Result( true, 200, "Role created", addRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const getUsersByRoleId : ( roleId: number ) => Promise<Result> = async( roleId : number ) => {
    try {
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT roleId FROM roles WHERE roleId = ?', [roleId]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const role : RowDataPacket = isExistRole[0][0];
        const isExistUserRole : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT userId FROM user_roles WHERE roleId = ?", [ role.roleId ] )
        if ( !isExistUserRole[0] || isExistUserRole[0]?.length == 0 ) {
            throw new notFoundError("User has role not found");
        }
        const userRoles : RowDataPacket[] = isExistUserRole[0];
        const usersOfRole : Promise<RowDataPacket>[] = userRoles.map( async( userRole : RowDataPacket ) => {
            const isExistUser : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT userId, userName, r.roleName FROM users as u INNER JOIN user_roles as ur ON u.userId = ur.userId INNER JOIN roles as r ON ur.roleId = r.roleId WHERE userId = ?", [ userRole.userId] );
            if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
                throw new notFoundError("User not found");
            }
            return isExistUser[0][0];
        } )
        const users : RowDataPacket[] = await Promise.all( usersOfRole );
        return new Result( true, 200, "Get user by roleId success", users );
    } catch (error : unknown ) {
        throw error
    }
}

const getPermissionsByRoleId : ( roleId : number ) => Promise<Result> = async( roleId : number ) => {
    try {
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query('SELECT roleId FROM roles WHERE roleId = ?', [roleId]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const role : RowDataPacket = isExistRole[0][0];
        const isExistRolePermission : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT permissionId FROM role_permissions WHERE roleId = ?", [ role.roleId ] )
        if ( !isExistRolePermission[0] || isExistRolePermission[0]?.length == 0 ) {
            throw new notFoundError("Permissions not found");
        }
        const permissions : RowDataPacket[] = isExistRolePermission[0];
        const permissionsOfRole : Promise<RowDataPacket>[] = permissions.map( async( permission : RowDataPacket ) => {
            const isExistPermission : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT permissionId, permissionName FROM permissions WHERE permissionId = ?", [ permission.permissionId] );
            if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
                throw new notFoundError("Permission not found");
            }
            return isExistPermission[0][0];
        } )
        const permissionsOfRoleName : RowDataPacket[] = await Promise.all( permissionsOfRole );
        return new Result( true, 200, "Get permissions by roleId success", permissionsOfRoleName );
    } catch (error : unknown ) {
        throw error
    }
}

const getAllRoles : () => Promise<Result> = async() => {
    try {
        const isExistRoles : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM roles");
        if ( !isExistRoles[0] || isExistRoles[0]?.length == 0 ) {
            throw new notFoundError("Roles not found");
        }
        return new Result( true, 200, "Get all roles success", isExistRoles[0] );
    } catch ( error : unknown ) {
        throw error;
    }
}

const updateRoles : ( roleId : number, roleBody : RoleBody ) => Promise<Result> = async( roleId : number, roleBody : RoleBody ) => {
    try {
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM roles WHERE roleId = ?", [ roleId ]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const updateRole : [ ResultSetHeader, FieldPacket[]] = await db.query("UPDATE roles SET roleName = ? WHERE roleId = ?", [roleBody.roleName, roleId]);
        if ( !updateRole[0] || updateRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("Role not updated");
        }
        return new Result( true, 200, "Role updated", updateRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const deleteRole : ( roleId : number ) => Promise<Result> = async( roleId : number ) => {
    try {
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT roleId FROM roles WHERE roleId = ?", [ roleId ]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const deleteRole : [ ResultSetHeader, FieldPacket[]] = await db.query("DELETE FROM roles WHERE roleId = ?", [ roleId ]);
        if ( !deleteRole[0] || deleteRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("Role not deleted");
        }
        return new Result( true, 200, "Role deleted", deleteRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const assignRoleToUser : ( userRoleBody : UserRoleBody ) => Promise<Result> = async( userRoleBody : UserRoleBody ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId FROM users WHERE userId = ?", [ userRoleBody.userId ]);
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT roleId FROM roles WHERE roleId = ?", [ userRoleBody.roleId ]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const isExistUserRole : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, roleId FROM user_roles WHERE userId =? AND roleId =?", [ userRoleBody.userId, userRoleBody.roleId ]);
        if ( !isExistUserRole[0] || isExistUserRole[0]?.length > 0 ) {
            throw new conflictError("User has role already exist");
        }
        const addUserRole : [ ResultSetHeader, FieldPacket[]] = await db.query("INSERT INTO user_roles( userId, roleId ) VALUES ( ?, ? )", [ userRoleBody.userId, userRoleBody.roleId ]);
        if ( !addUserRole[0] || addUserRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("User role not assgin");
        }
        return new Result( true, 200, "User role created", addUserRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}

const removeRolesOutOfUser : ( userRoleBody : UserRoleBody ) => Promise<Result> = async( userRoleBody : UserRoleBody ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId FROM users WHERE userId = ?", [ userRoleBody.userId ]);
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("UserId not found");
        }
        const isExistRole : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT roleId FROM roles WHERE roleId = ?", [ userRoleBody.roleId ]);
        if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
            throw new notFoundError("RoleId not found");
        }
        const isExistUserRole : [ RowDataPacket[], FieldPacket[]] = await db.query("SELECT userId, roleId FROM user_roles WHERE userId =? AND roleId =?", [ userRoleBody.userId, userRoleBody.roleId ]);
        if ( !isExistUserRole[0] || isExistUserRole[0]?.length == 0 ) {
            throw new notFoundError("User has role not found");
        }
        const removeUserRole : [ ResultSetHeader, FieldPacket[]] = await db.query("DELETE FROM user_roles WHERE userId = ? AND roleId = ?", [ userRoleBody.userId, userRoleBody.roleId ]);
        if ( !removeUserRole[0] || removeUserRole[0]?.affectedRows == 0 ) {
            throw new badRequestError("User role not deleted");
        }
        return new Result( true, 200, "User role deleted", removeUserRole[0] );
    } catch (error : unknown ) {
        throw error
    }
}


export default {
    addRole,
    getUsersByRoleId,
    getPermissionsByRoleId,
    getAllRoles,
    updateRoles,
    deleteRole,
    assignRoleToUser,
    removeRolesOutOfUser
}